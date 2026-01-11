import { NextResponse } from "next/server";
import { generateSolution, type GenerationRequest } from "@/lib/generator";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<GenerationRequest>;

  const sanitized: GenerationRequest = {
    title: body.title?.slice(0, 120) ?? "Personal build",
    problem: body.problem?.slice(0, 2000) ?? "",
    targetStack: body.targetStack?.slice(0, 120) ?? "Web app",
    features: Array.isArray(body.features)
      ? body.features
          .map((item) => (typeof item === "string" ? item.slice(0, 160) : ""))
          .filter(Boolean)
      : [],
    focus: body.focus?.slice(0, 200) ?? "",
    includeTests: Boolean(body.includeTests)
  };

  const result = generateSolution(sanitized);

  return NextResponse.json({
    ok: true,
    payload: result
  });
}
