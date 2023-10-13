import { useAppSelector } from "@/redux/hooks"
export default function Messages() {
    const { channel } = useAppSelector(s => s.channel)
    if (channel === null) {
        return
    }
    
    const { messages } = channel
    
    return (
        <div>

        </div>
    )
}