export const Nutritions = ({label, quantity, unit}) => {
    return(
        <div className="container">
            <p><b>{label}</b> - {quantity.toFixed(1)} {unit}</p>
        </div>
    )
} 