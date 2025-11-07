'use client'
import React, { useState, useCallback } from 'react'
import NextImage from 'next/image'
import html2canvas from 'html2canvas'
import localFont from 'next/font/local'
import Cropper from 'react-easy-crop'
import { Area, Point } from 'react-easy-crop'

const mtavruli = localFont({
  src: [
    { path: '../../../public/fonts/nino_mtavruli_normal.ttf', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/nino_mtavruli_bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--mtavruli',
  display: 'swap',
})

const getCroppedImg = async (imageSrc: string, crop: Area): Promise<string | null> => {
  const image = new Image()
  image.src = imageSrc
  await new Promise((r) => (image.onload = r))

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  canvas.width = crop.width
  canvas.height = crop.height

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve(null)
      const fileUrl = URL.createObjectURL(blob)
      resolve(fileUrl)
    }, 'image/png')
  })
}


const Page = () => {
  const [uploadedImg, setUploadedImg] = useState<string | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null)
  const [caption, setCaption] = useState<string>('')
  const [textColor, setTextColor] = useState<string>('#000000')
  const [isBold, setIsBold] = useState<boolean>(false)
  const [fontSize, setFontSize] = useState<string>('20px')

  // crop states
  const [isCropping, setIsCropping] = useState(false)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)


  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setUploadedImg(url)
      setIsCropping(true)
    }
  }

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
  setCroppedAreaPixels(croppedAreaPixels)
}, [])


  const applyCrop = async () => {
    if (uploadedImg && croppedAreaPixels) {
      const croppedImg = await getCroppedImg(uploadedImg, croppedAreaPixels)
      setUploadedImg(croppedImg)
      setIsCropping(false)
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

  const frames = [
    '/frames/frame-1.png',
    '/frames/frame-2.png',
    '/frames/frame-3.png',
    '/frames/frame-4.png',
    '/frames/frame-5.png',
    '/frames/frame-6.png',
    '/frames/frame-7.png',
    '/frames/frame-8.png',
  ]

  const presetColors = ['#DCF303', '#67206E', '#FFFFFF', '#000000']

  const fontSizeOptions = [
    { label: 'XS', value: '12px' },
    { label: 'Small', value: '16px' },
    { label: 'Medium', value: '20px' },
    { label: 'Large', value: '24px' },
    { label: 'XL', value: '28px' },
    { label: 'XXL', value: '32px' },
    { label: 'XXXL', value: '36px' },
  ]



  return (
    <div className="md:max-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Panel */}
      <div className="py-4 md:w-[20%] flex md:flex-col md:items-center gap-3 md:py-4 overflow-y-scroll
      bg-gradient-to-br from-[#F4FCFB] via-[#EEF4FA] to-[#ECEAFB]">
        {frames.map((src, i) => (
          <NextImage
            key={i}
            src={src}
            alt={`Frame ${i}`}
            width={100}
            height={100}
            onClick={() => setSelectedFrame(src)}
            className={`rounded cursor-pointer border-2 transition ${
              selectedFrame === src ? 'border-green-500 scale-110' : 'border-transparent'
            } hover:border-gray-400`}
          />
        ))}
      </div>

      {/* Middle - Preview */}
      <div className="w-full md:w-[40%] flex items-center justify-center p-4">
        <div
          id="preview"
          className={`relative w-[360px] aspect-[4/5] ${mtavruli.className}`}
        >
          {uploadedImg ? (
            <>
              <img
                src={uploadedImg}
                alt="Uploaded"
                className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
              />

              {selectedFrame && (
                <img
                  src={selectedFrame}
                  alt="Frame"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}

              {caption && (
                <p
                  className="absolute w-full bottom-7 text-center px-2 z-10 break-words"
                  style={{
                    color: textColor,
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontSize: fontSize,
                    lineHeight: 1.25,
                    textShadow: '0 0 3px rgba(0,0,0,0.2)',
                  }}
                >
                  {caption}
                </p>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm">
              Upload an image to start editing
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Controls */}
      <div className="w-full md:w-[45%] p-4 flex flex-col gap-4 overflow-y-auto shadow-xl 
      bg-gradient-to-br from-[#EDF5F8] to-[#DDEAF8]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="upload" />
          <label
            htmlFor="upload"
            className="px-5 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white cursor-pointer hover:shadow-md 
                      transition-all rounded-lg text-sm font-medium"
          >
            Upload Image
          </label>

          {uploadedImg && (
            <button
              onClick={exportImage}
              className="px-5 py-3 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
            >
              Export Final Image
            </button>
          )}
        </div>

        {/* Caption */}
        <textarea
          placeholder="Write your caption here..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full h-28 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-300 outline-none resize-none text-sm bg-white/80"
        />

        {/* Controls */}
        <div className="flex flex-col gap-6">
          {/* Colors */}
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-10 cursor-pointer rounded border border-gray-300"
            />
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => setTextColor(color)}
                style={{ backgroundColor: color }}
                className={`w-8 h-8 rounded-full border-2 ${
                  textColor === color ? 'border-gray-800' : 'border-gray-300'
                } hover:scale-105 transition-all`}
              />
            ))}
          </div>



          {/* Font Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsBold((p) => !p)}
              className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                isBold
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isBold ? 'Bold ✓' : 'Bold'}
            </button>

            <div className="flex items-center gap-2">
              <label className="font-medium text-sm whitespace-nowrap">Font Size</label>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white/80 focus:ring-2 focus:ring-emerald-300 outline-none"
              >
                {fontSizeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Crop Modal */}
      {isCropping && uploadedImg && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl w-[90vw] max-w-lg relative flex flex-col gap-4">
            <div className="relative w-full h-80 bg-black">
              <Cropper
                image={uploadedImg}
                crop={crop}
                zoom={zoom}
                aspect={4 / 5}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex justify-between mt-3">
              <button
                onClick={() => setIsCropping(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={applyCrop}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
