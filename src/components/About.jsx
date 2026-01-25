import React, { useState, useRef } from 'react';
import { Volume2, StopCircle } from 'lucide-react';

const About = ({ apiKey }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);

  const handleSpeakMission = async () => {
    if (isSpeaking) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const textToSpeak = "Mission. To support research-led curatorial inquiry, international exchange, and public engagement with contemporary art from India.";

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: textToSpeak }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } }
          }
        })
      });

      const data = await response.json();
      const audioContent = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (audioContent) {
        const audioBytes = Uint8Array.from(atob(audioContent), c => c.charCodeAt(0));
        const wavUrl = createWavUrl(audioBytes);
        const audio = new Audio(wavUrl);
        audioRef.current = audio;
        audio.onended = () => setIsSpeaking(false);
        audio.play();
      } else {
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setIsSpeaking(false);
    }
  };

  const createWavUrl = (pcmData) => {
    const sampleRate = 24000;
    const numChannels = 1;
    const bitsPerSample = 16;
    const header = new ArrayBuffer(44);
    const view = new DataView(header);
    
    const writeString = (view, offset, string) => {
      for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i));
    };
    
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + pcmData.length, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true);
    view.setUint16(32, numChannels * (bitsPerSample / 8), true);
    view.setUint16(34, bitsPerSample, true);
    writeString(view, 36, 'data');
    view.setUint32(40, pcmData.length, true);
    
    const blob = new Blob([header, pcmData], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  };

  return (
    <section id="about" className="py-20 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase mb-4 block">About Us</span>
          <h2 className="text-4xl md:text-5xl font-light leading-tight text-gray-900 mb-8">
            The Saat Saath Arts Foundation is a New Delhi-based non-profit organisation established in 2010 to foster critical dialogue and public engagement with contemporary visual art from India.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We believe that art can serve as a vital platform for reflection, conversation, and social transformation. Through grants, residencies, exhibitions, and public programs, we seek to support curatorial inquiry, artistic experimentation, and transnational exchange. Our work is guided by a commitment to pluralism, accessibility, and the exploration of diverse artistic voices and perspectives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-gray-50 p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Mission</h3>
              <button 
                onClick={handleSpeakMission}
                className={`p-2 rounded-full transition-all ${isSpeaking ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                aria-label={isSpeaking ? "Stop reading" : "Read aloud"}
              >
                {isSpeaking ? <StopCircle size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To support research-led curatorial inquiry, international exchange, and public engagement with contemporary art from India.
            </p>
          </div>

          <div className="bg-gray-50 p-8">
            <h3 className="text-xl font-semibold mb-4">Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To cultivate a vibrant, inclusive ecosystem where contemporary art from India is celebrated, critically examined, and globally connected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
