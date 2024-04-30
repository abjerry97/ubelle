const Image2Base64 = async (file) => {
    const imgReader = new FileReader()
    imgReader.readAsDataURL(file)

    const imgData = new Promise((res, rej) => {
        imgReader.onload = () => res(imgReader.result)
        imgReader.onerror = err => rej(err)
    })

    return imgData
}

export default Image2Base64