import './CalculatorKey.css';

const CalculatorKey = (props) => {
    return (
        <button onClick={()=>props.onHandleOperation(props.keyValue)}>{props.keyValue}</button>    
    )
}

export default CalculatorKey;