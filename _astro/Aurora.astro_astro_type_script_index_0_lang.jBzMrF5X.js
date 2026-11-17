const r=document.getElementById("aurora"),E=window.matchMedia("(prefers-reduced-motion: reduce)"),M=`
    attribute vec2 p;
    void main() { gl_Position = vec4(p, 0.0, 1.0); }
  `,I=`
    precision highp float;
    uniform vec2  u_res;
    uniform float u_time;
    uniform float u_dark;
    uniform float u_scroll;
    uniform vec3  u_mouse; // xy in 0..1, z = how recently the pointer moved

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p *= 2.02;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res.xy;
      vec2 p  = uv * vec2(u_res.x / u_res.y, 1.0);
      float t = u_time * 0.075;

      // Warp the domain so the bands fold instead of merely sliding
      vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
      vec2 r = vec2(
        fbm(p + 3.0 * q + vec2(1.7, 9.2) + 0.3 * t),
        fbm(p + 3.0 * q + vec2(8.3, 2.8) - 0.2 * t)
      );
      float f = fbm(p + 2.4 * r);

      // Two bands — lime and cyan — blended by the warp itself rather than a
      // fixed ratio, so the transition between them drifts and folds instead
      // of reading as a flat gradient.
      // Light theme: a translucent wash of brand blue and warm orange over
      // the cream page, output premultiplied so the page shows through.
      vec3 blue   = vec3(0.122, 0.310, 0.820);
      vec3 orange = vec3(0.949, 0.420, 0.227);
      // Dark theme: same two hues, lifted so they glow against the navy page
      blue   = mix(blue,   vec3(0.38, 0.56, 1.0),  u_dark);
      orange = mix(orange, vec3(1.0, 0.52, 0.30),  u_dark);
      vec3 col = mix(blue, orange, smoothstep(0.4, 0.85, r.x));

      // Flowing curtains: bright folds that slide through the field, so the
      // light has structure and movement instead of being one soft cloud.
      float rib = 0.5 + 0.5 * sin(p.x * 3.2 + f * 6.5 + r.y * 4.0 - t * 7.0);
      rib = rib * rib * rib;
      col = mix(col, vec3(0.62, 0.76, 1.0), rib * 0.18 * u_dark);

      // Three pools of light. They migrate down the page as it scrolls, so
      // the backdrop changes character from section to section, and a fourth
      // one leans toward the pointer.
      vec2 mA = vec2(0.82 - 0.34 * u_scroll, 0.85 - 0.55 * u_scroll);
      vec2 mB = vec2(0.48 + 0.30 * u_scroll, 1.05 - 0.75 * u_scroll);
      vec2 mC = vec2(0.10 + 0.22 * u_scroll, 0.18 + 0.30 * u_scroll);
      float poolA = smoothstep(1.2, 0.0, distance(uv, mA));
      float poolB = smoothstep(1.1, 0.0, distance(uv, mB)) * 0.85;
      float poolC = smoothstep(0.95, 0.0, distance(uv, mC)) * 0.6;
      float poolM = smoothstep(0.5, 0.0, distance(uv, u_mouse.xy)) * 0.4 * u_mouse.z;
      float pool = max(max(poolA, poolB), max(poolC, poolM));

      // Text sits lower-left: keep that corner calmer, but never fully dark
      float clear = mix(0.3, 1.0, smoothstep(-0.3, 0.7, uv.x * 0.5 + uv.y * 0.4));

      float glow = smoothstep(0.3, 0.82, f) * (0.6 + 0.7 * rib);
      float a = clamp(glow * pool * clear * mix(0.48, 0.5, u_dark), 0.0, 1.0);
      gl_FragColor = vec4(col * a, a);
    }
  `;function L(e,i,s){const o=e.createShader(i);return e.shaderSource(o,s),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)?o:(console.warn("[aurora] shader failed:",e.getShaderInfoLog(o)),null)}function T(){if(!r)return;if(window.matchMedia("(hover: none)").matches){r.remove();return}const e=r.getContext("webgl",{alpha:!0,antialias:!1,powerPreference:"low-power"})||r.getContext("experimental-webgl");if(!e)return;const i=L(e,e.VERTEX_SHADER,M),s=L(e,e.FRAGMENT_SHADER,I);if(!i||!s)return;const o=e.createProgram();if(e.attachShader(o,i),e.attachShader(o,s),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS))return;e.useProgram(o);const S=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,S),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);const d=e.getAttribLocation(o,"p");e.enableVertexAttribArray(d),e.vertexAttribPointer(d,2,e.FLOAT,!1,0,0);const R=e.getUniformLocation(o,"u_res"),h=e.getUniformLocation(o,"u_time"),k=e.getUniformLocation(o,"u_dark"),F=e.getUniformLocation(o,"u_scroll"),C=e.getUniformLocation(o,"u_mouse"),v=t=>e.uniform1f(k,t==="dark"?1:0);v(document.documentElement.dataset.theme??"light");let p=0,u=0;const c={x:.7,y:.6},a={x:.7,y:.6,z:0};let g=-1e9;const w=()=>{const t=document.documentElement.scrollHeight-window.innerHeight;p=t>0?Math.min(Math.max(window.scrollY/t,0),1):0};w(),window.addEventListener("scroll",w,{passive:!0}),window.addEventListener("pointermove",t=>{c.x=t.clientX/window.innerWidth,c.y=1-t.clientY/window.innerHeight,g=performance.now()},{passive:!0});const b=.5;let n=0,x=performance.now(),m=0;function _(){const t=Math.round(r.clientWidth*b),l=Math.round(r.clientHeight*b);r.width===t&&r.height===l||(r.width=t,r.height=l,e.viewport(0,0,t,l),e.uniform2f(R,t,l))}function f(t){u+=(p-u)*.05,a.x+=(c.x-a.x)*.06,a.y+=(c.y-a.y)*.06,a.z+=((t-g<2500?1:0)-a.z)*.04,e.uniform1f(F,u),e.uniform3f(C,a.x,a.y,a.z),e.uniform1f(h,(t-x)/1e3),e.drawArrays(e.TRIANGLES,0,3),n=requestAnimationFrame(f)}function A(){n||(x+=performance.now()-m,n=requestAnimationFrame(f))}function y(){cancelAnimationFrame(n),n=0,m=performance.now()}_(),window.addEventListener("resize",_,{passive:!0}),document.addEventListener("visibilitychange",()=>document.hidden?y():A()),E.matches?(e.uniform1f(h,12),e.drawArrays(e.TRIANGLES,0,3),m=performance.now()):n=requestAnimationFrame(f),E.addEventListener("change",t=>t.matches?y():A()),window.addEventListener("themechange",t=>{v(t.detail),n||e.drawArrays(e.TRIANGLES,0,3)})}"requestIdleCallback"in window?requestIdleCallback(()=>T(),{timeout:1200}):setTimeout(T,300);
