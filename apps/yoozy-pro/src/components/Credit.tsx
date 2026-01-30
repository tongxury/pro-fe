

const Credit = ({ value, color = "#7150ff", className }: { value: number, color?: string, className?: string }) => {
    return <div className={`flex items-center gap-1.5 ${className}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
        </svg>
        <span className="font-bold text-base font-sans leading-none" style={{ color: color }}>
            {value}
        </span>
    </div>
}

export default Credit