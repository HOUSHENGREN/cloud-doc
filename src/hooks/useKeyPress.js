import { useEffect, useState } from "react"

const useKeyPress = (targetKeyCode) => {
    const [keyPressed, setKeyPressed] = useState(false) 
    const keydownHandler = (event) => {
        if(event.keyCode === targetKeyCode) {
            setKeyPressed(true)
        }
    }
    const keyupHandler = (event) => {
        if(event.keyCode === targetKeyCode) {
            setKeyPressed(false)
        }
    }

    // 每次渲染都添加事件
    useEffect(() => {
        document.addEventListener('keyup', keyupHandler)
        document.addEventListener('keydown', keydownHandler)
        return () => {
            document.removeEventListener('keyup', keyupHandler)
            document.removeEventListener('keydown', keydownHandler) 
        }
    }, [])

    return keyPressed
}

export default useKeyPress