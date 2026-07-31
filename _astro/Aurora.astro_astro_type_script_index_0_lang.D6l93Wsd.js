const o=document.getElementById("aurora"),w=window.matchMedia("(prefers-reduced-motion: reduce)"),y=`
    attribute vec2 p;
    void main() { gl_Position = vec4(p, 0.0, 1.0); }
  `,_=`
    precision highp float;
    uniform vec2  u_res;
    uniform float u_time;

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
      float t = u_time * 0.05;

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
      vec3 lime = vec3(0.686, 0.973, 0.176);
      vec3 cyan = vec3(0.086, 0.796, 0.753);
      vec3 deep = vec3(0.035, 0.115, 0.105);
      vec3 band = mix(lime, cyan, smoothstep(0.3, 0.7, r.x));
      vec3 col  = mix(deep, band, clamp(f * f * 1.5, 0.0, 1.0));

      // This is a backdrop, not a subject. Text has to stay readable, so the
      // light still favours the top-right — but two overlapping pools (wider
      // radius than before) let it reach further across the page.
      float glow = smoothstep(0.38, 0.92, f);
      float poolA = smoothstep(1.1, 0.0, distance(uv, vec2(0.82, 0.85)));
      float poolB = smoothstep(1.1, 0.0, distance(uv, vec2(0.48, 1.05))) * 0.75;
      float pool = max(poolA, poolB);
      // Extra falloff toward the lower-left, where the copy sits
      float clear = smoothstep(-0.3, 0.7, uv.x * 0.5 + uv.y * 0.4);

      gl_FragColor = vec4(col * glow * pool * clear * 0.42, 1.0);
    }
  `;function g(e,n,i){const t=e.createShader(n);return e.shaderSource(t,i),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)?t:(console.warn("[aurora] shader failed:",e.getShaderInfoLog(t)),null)}function b(){if(!o)return;const e=o.getContext("webgl",{alpha:!0,antialias:!1,powerPreference:"low-power"})||o.getContext("experimental-webgl");if(!e)return;const n=g(e,e.VERTEX_SHADER,y),i=g(e,e.FRAGMENT_SHADER,_);if(!n||!i)return;const t=e.createProgram();if(e.attachShader(t,n),e.attachShader(t,i),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS))return;e.useProgram(t);const A=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);const l=e.getAttribLocation(t,"p");e.enableVertexAttribArray(l),e.vertexAttribPointer(l,2,e.FLOAT,!1,0,0);const x=e.getUniformLocation(t,"u_res"),u=e.getUniformLocation(t,"u_time"),d=.5;let a=0,m=performance.now(),s=0;function h(){const r=Math.round(window.innerWidth*d),c=Math.round(window.innerHeight*d);o.width===r&&o.height===c||(o.width=r,o.height=c,e.viewport(0,0,r,c),e.uniform2f(x,r,c))}function f(r){e.uniform1f(u,(r-m)/1e3),e.drawArrays(e.TRIANGLES,0,3),a=requestAnimationFrame(f)}function p(){a||(m+=performance.now()-s,a=requestAnimationFrame(f))}function v(){cancelAnimationFrame(a),a=0,s=performance.now()}h(),window.addEventListener("resize",h,{passive:!0}),document.addEventListener("visibilitychange",()=>document.hidden?v():p()),w.matches?(e.uniform1f(u,12),e.drawArrays(e.TRIANGLES,0,3),s=performance.now()):a=requestAnimationFrame(f),w.addEventListener("change",r=>r.matches?v():p())}"requestIdleCallback"in window?requestIdleCallback(()=>b(),{timeout:1200}):setTimeout(b,300);
