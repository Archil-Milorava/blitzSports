'use client'
import html2canvas from 'html2canvas'
import React, { useState } from 'react'
import NextImage from 'next/image'

const Page = () => {
  const [uploadedImg, setUploadedImg] = useState<string | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null)
  const [caption, setCaption] = useState<string>('')
  const [textColor, setTextColor] = useState<string>('#000000')
  const [isBold, setIsBold] = useState<boolean>(false)
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setUploadedImg(url)
    }
  }

  const exportImage = async () => {
    const preview = document.getElementById('preview')
    if (!preview) return

    const scale = window.devicePixelRatio * 2 

    const canvas = await html2canvas(preview, {
      backgroundColor: null,
      scale,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
    })

    const link = document.createElement('a')
    link.download = 'card.png'
    link.href = canvas.toDataURL('image/png', 1.0)
    link.click()
  }

  const frames = ['/frames/frame-1.png', '/frames/frame-2.png', '/frames/frame-3.png', '/frames/frame-4.png', '/frames/frame-5.png', '/frames/frame-8.png']
  const presetColors = ['#DCF303', '#67206E', '#FFFFFF', '#000000']

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden">
      {/* LEFT: Frames */}
<div className="md:w-[20%] w-full flex md:flex-col flex-row md:items-center items-start gap-4 p-4
                md:pt-4 md:overflow-y-auto overflow-x-auto">
  {frames.map((src, i) => (
    <NextImage
      key={i}
      src={src}
      alt={`Frame ${i}`}
      width={140}
      height={140}
      onClick={() => setSelectedFrame(src)}
      className={`flex-shrink-0 cursor-pointer border-2 rounded-md transition-all ${
        selectedFrame === src
          ? 'border-emerald-400 shadow-lg scale-105'
          : 'border-transparent'
      }`}
    />
  ))}
</div>

      {/* RIGHT: Editor */}
      <div className="flex-1 bg-gray-200 flex flex-col items-center justify-start gap-6 relative p-4 md:p-4">
        {/* Upload */}
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="upload" />
        <label
          htmlFor="upload"
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg cursor-pointer hover:bg-emerald-600 transition-all duration-300 text-sm sm:text-base"
        >
          Upload Image
        </label>

        {/* PREVIEW */}
        <div
          id="preview"
          className="relative bg-white shadow-xl overflow-hidden rounded-lg"
          style={{
            width: '90vw',
            maxWidth: '400px',
            aspectRatio: '4/5', 
            contain: 'layout paint',
          }}
        >
          {uploadedImg && (
            <>
              {/* Base image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={uploadedImg}
                  alt="Uploaded"
                  className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
                />
              </div>

              {/* Frame */}
              {selectedFrame && (
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={selectedFrame}
                    alt="Frame"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              )}

              {/* Caption */}
              {caption && (
                <p
                  className="absolute w-full bottom-8 text-center px-4 z-10"
                  style={{
                    color: textColor,
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontSize:
                      fontSize === 'small'
                        ? '12px'
                        : fontSize === 'large'
                        ? '26px'
                        : '20px',
                    textShadow: '0 0 4px rgba(0,0,0,0.3)',
                          lineHeight: 1.2, // <-- add this
                  }}
                >
                  {caption}
                </p>
              )}
            </>
          )}
        </div>

        {/* TEXT INPUT */}
        <textarea
          placeholder="Write caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-[90vw] max-w-[400px] h-24 p-3 border rounded-lg resize-y outline-none focus:ring-2 focus:ring-emerald-200 text-sm sm:text-base"
        />

        {/* CONTROLS */}
        <div className="flex flex-col items-center gap-3">
          {/* Color Picker */}
          <div className="flex flex-wrap justify-center items-center gap-3">
            <label className="font-medium text-sm sm:text-base">Text color:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-8 h-8 cursor-pointer"
            />
            <div className="flex gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setTextColor(color)}
                  style={{ backgroundColor: color }}
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
              ))}
            </div>
          </div>

          {/* Bold + Font Size */}
          <div className="flex items-center justify-center gap-4 mt-2 flex-wrap">
            <button
              onClick={() => setIsBold((prev) => !prev)}
              className={`px-4 py-2 rounded transition-all duration-300 cursor-pointer hover:shadow ${
                isBold ? 'bg-emerald-400 text-white' : 'bg-white text-black'
              }`}
            >
              {isBold ? 'Bold ✓' : 'Bold'}
            </button>

            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value as 'small' | 'medium' | 'large')}
              className="border rounded px-3 py-2 text-sm sm:text-base"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        {/* Export Button */}
        {uploadedImg && (
          <button
            onClick={exportImage}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 mt-4 text-sm sm:text-base"
          >
            Export Final Image
          </button>
        )}
      </div>
    </div>
  )
}

export default Page
