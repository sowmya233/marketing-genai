import React, { useState } from "react";
import { generatePersona } from "../services/geminiService";

const Personas: React.FC = () => {

  const [product, setProduct] = useState("Enterprise B2B Software");
  const [customProduct, setCustomProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState<any>(null);

  const toArray = (value: any) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      return value
        .replace(/\[|\]/g, "")
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);
    }
    return [String(value)];
  };

  const handleGenerate = async () => {
    const finalProduct = product === "Others" ? customProduct : product;
    if (!finalProduct) return;

    setLoading(true);

    try {
      const data = await generatePersona(finalProduct);

      console.log("PERSONA RESPONSE:", data);

      setPersona({
        name: data?.name || "AI Generated Persona",
        demographics: data?.demographics || "Target user profile",
        behavior: data?.behavior || "Not specified",
        painPoints: toArray(data?.painPoints),
        triggers: toArray(data?.triggers),
        platforms: toArray(data?.platforms)
      });

    } catch (err) {
      console.error("Persona Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 text-white">

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black uppercase italic">
          Persona Profiler
        </h1>
        <p className="text-slate-400">
          Deep psychological mapping of your ideal customer.
        </p>
      </div>

      <div className="glass p-10 rounded-[2rem] space-y-8">

        <div className="flex flex-col md:flex-row gap-4">

          <select
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-6 py-4"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            <option>Enterprise B2B Software</option>
            <option>SaaS: Cybersecurity Suite</option>
            <option>D2C: Premium Wellness</option>
            <option>Online Educational Academy</option>
            <option value="Others">Others (Custom)</option>
          </select>

          <button
            onClick={handleGenerate}
            disabled={loading || (product === "Others" && !customProduct)}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold"
          >
            {loading ? "Generating..." : "Generate Persona"}
          </button>

        </div>

        {product === "Others" && (
          <input
            className="w-full bg-slate-900 border border-blue-500/40 rounded-xl px-6 py-4"
            placeholder="Describe your product..."
            value={customProduct}
            onChange={(e) => setCustomProduct(e.target.value)}
          />
        )}

        {persona && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            <div className="space-y-6">

              <div className="bg-slate-900 p-8 rounded-2xl">
                <div className="text-3xl font-bold">
                  {persona.name}
                </div>
                <div className="text-blue-400 text-sm uppercase mt-2">
                  {persona.demographics}
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl">
                <h3 className="font-bold mb-2">Psychographic Behavior</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {persona.behavior}
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl">
                <h3 className="font-bold mb-3 text-red-400">Pain Points</h3>
                <div className="space-y-2">
                  {persona.painPoints.map((point: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-red-400 mt-1">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="space-y-6">

              <div className="bg-slate-900 p-6 rounded-2xl">
                <h3 className="font-bold mb-3 text-green-400">Purchase Triggers</h3>
                <div className="space-y-2">
                  {persona.triggers.map((trigger: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{trigger}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Engagement Platforms</h3>

                <div className="flex flex-wrap gap-3">
                  {persona.platforms.map((plat: string, i: number) => (
                    <span
                      key={i}
                      className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-xl text-sm"
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Personas;
