import React, { useState } from 'react';
import { analyzeProductImage, generateProductImage } from '../services/geminiService';

const ProductVision: React.FC = () => {

  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const [genPrompt, setGenPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [genLoading, setGenLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage(base64String);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    setAnalysis(null);

    try {
      const result = await analyzeProductImage(image, mimeType);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setAnalysis("Error analyzing image.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!genPrompt) return;

    setGenLoading(true);
    setGeneratedImage(null);

    try {
      const img = await generateProductImage(genPrompt);
      setGeneratedImage(img);
    } catch (err) {
      console.error(err);
      alert("Error generating image.");
    } finally {
      setGenLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in duration-500">

      {/* EXISTING ANALYSIS SECTION */}
      <div className="space-y-10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-white text-2xl shadow-2xl shadow-purple-500/20">
            <i className="fa-solid fa-eye"></i>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Product Vision</h1>
            <p className="text-slate-400 text-lg">
              Visual Asset Intelligence & Strategic Aesthetic Analysis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="glass p-10 rounded-[3rem] space-y-8 border-purple-500/10 h-fit">
            <div className="aspect-square bg-slate-900/80 rounded-[2.5rem] border-2 border-dashed border-slate-700 flex flex-col items-center justify-center relative overflow-hidden group">
              {image ? (
                <img
                  src={`data:${mimeType};base64,${image}`}
                  className="w-full h-full object-contain p-8"
                  alt="Preview"
                />
              ) : (
                <div className="text-center p-8">
                  <i className="fa-solid fa-cloud-arrow-up text-5xl text-slate-600"></i>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!image || loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-2xl"
            >
              {loading ? "Analyzing..." : "Analyze Visual DNA"}
            </button>
          </div>

          <div className="glass p-10 rounded-[3rem] min-h-[500px]">
            {analysis ? (
              <div
                className="text-slate-300 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, "<br/>") }}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600">
                Awaiting AI analysis...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NEW IMAGE GENERATION SECTION */}
      <div className="space-y-8 border-t border-slate-800 pt-16">

        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center text-white text-2xl shadow-xl">
            <i className="fa-solid fa-image"></i>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">AI Product Image Generator</h2>
            <p className="text-slate-400">
              Generate new marketing visuals using AI.
            </p>
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] space-y-6">

          <input
            type="text"
            placeholder="Describe the product image you want to generate..."
            value={genPrompt}
            onChange={(e) => setGenPrompt(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white"
          />

          <button
            onClick={handleGenerateImage}
            disabled={genLoading || !genPrompt}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 rounded-2xl"
          >
            {genLoading ? "Generating Image..." : "Generate Image"}
          </button>

          {generatedImage && (
            <div className="mt-8">
              <img
                src={`data:image/png;base64,${generatedImage}`}
                alt="Generated"
                className="rounded-2xl w-full object-contain"
              />
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductVision;
