"use client";

import { useEffect, useRef } from "react";

// ── Vertex Shader ─────────────────────────────────────────────────────────────
const VS_SOURCE = `
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
`;

// ── Fragment Shader (رنگ‌های برند: بنفش تیره + طلایی) ────────────────────────
const FS_SOURCE = `
  precision highp float;
  uniform vec2  iResolution;
  uniform float iTime;

  const float overallSpeed       = 0.2;
  const float gridSmoothWidth    = 0.015;
  const float axisWidth          = 0.05;
  const float majorLineWidth     = 0.025;
  const float minorLineWidth     = 0.0125;
  const float majorLineFrequency = 5.0;
  const float minorLineFrequency = 1.0;
  const float scale              = 5.0;
  const float minLineWidth       = 0.01;
  const float maxLineWidth       = 0.18;
  const float lineSpeed          = 1.0 * overallSpeed;
  const float lineAmplitude      = 1.0;
  const float lineFrequency      = 0.2;
  const float warpSpeed          = 0.2 * overallSpeed;
  const float warpFrequency      = 0.5;
  const float warpAmplitude      = 1.0;
  const float offsetFrequency    = 0.5;
  const float offsetSpeed        = 1.33 * overallSpeed;
  const float minOffsetSpread    = 0.6;
  const float maxOffsetSpread    = 2.0;
  const int   linesPerGroup      = 16;

  /* رنگ خطوط: طلایی برند #C9A45C */
  const vec4 lineColor = vec4(0.79, 0.64, 0.36, 1.0);

  #define drawCircle(pos, radius, coord)      smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, hw, t)          smoothstep(hw, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, hw, t)           smoothstep(hw + gridSmoothWidth, hw, abs(pos - (t)))
  #define drawPeriodicLine(freq, width, t)    drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

  float drawGridLines(float axis) {
    return drawCrispLine(0.0, axisWidth, axis)
         + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
         + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
  }

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float hFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * hFade * lineAmplitude + offset;
  }

  void main() {
    vec2 uv    = gl_FragCoord.xy / iResolution.xy;
    vec2 space = (gl_FragCoord.xy - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

    float hFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float vFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + hFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * hFade;

    vec4 lines = vec4(0.0);

    /* پس‌زمینه: گرادیان از #2E2433 به #4A2C59 (رنگ‌های برند) */
    vec4 bgColor1 = vec4(0.18, 0.14, 0.20, 1.0);
    vec4 bgColor2 = vec4(0.29, 0.17, 0.35, 1.0);

    for (int l = 0; l < linesPerGroup; l++) {
      float nli          = float(l) / float(linesPerGroup);
      float offsetTime   = iTime * offsetSpeed;
      float offsetPos    = float(l) + space.x * offsetFrequency;
      float rand         = random(offsetPos + offsetTime) * 0.5 + 0.5;
      float halfWidth    = mix(minLineWidth, maxLineWidth, rand * hFade) / 2.0;
      float offset       = random(offsetPos + offsetTime * (1.0 + nli)) * mix(minOffsetSpread, maxOffsetSpread, hFade);
      float linePos      = getPlasmaY(space.x, hFade, offset);
      float line         = drawSmoothLine(linePos, halfWidth, space.y) / 2.0
                         + drawCrispLine(linePos, halfWidth * 0.15, space.y);

      float cx           = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2  cp           = vec2(cx, getPlasmaY(cx, hFade, offset));
      float circle       = drawCircle(cp, 0.01, space) * 4.0;

      lines += (line + circle) * lineColor * rand;
    }

    vec4 color  = mix(bgColor1, bgColor2, uv.x);
    color      *= vFade;
    color.a     = 1.0;
    color      += lines;

    gl_FragColor = color;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────

function loadShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function initShaderProgram(
  gl: WebGLRenderingContext,
  vs: string,
  fs: string
): WebGLProgram | null {
  const vShader = loadShader(gl, gl.VERTEX_SHADER, vs);
  const fShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);
  if (!vShader || !fShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

// ─────────────────────────────────────────────────────────────────────────────

interface ShaderBackgroundProps {
  /** کلاس‌های Tailwind — پیش‌فرض: پوشش کامل absolute */
  className?: string;
}

export default function ShaderBackground({
  className = "absolute inset-0 w-full h-full",
}: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported — falling back to plain background.");
      return;
    }

    const program = initShaderProgram(gl, VS_SOURCE, FS_SOURCE);
    if (!program) return;

    /* geometry: یک مستطیل تمام‌صفحه */
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const attribLoc   = gl.getAttribLocation(program, "aVertexPosition");
    const uResolution = gl.getUniformLocation(program, "iResolution");
    const uTime       = gl.getUniformLocation(program, "iTime");

    const resizeCanvas = () => {
      canvas.width  = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const startTime = Date.now();
    let animId: number;

    const render = () => {
      const t = (Date.now() - startTime) / 1000;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(attribLoc, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(attribLoc);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
