import React, {useState} from 'react';
import './Calculator.css';

import CalculatorKey from './CalculatorKey.jsx';

const Calculator = () => {
    const [prevValue, setPrevValue] = useState(null);
    const [nextValue, setNextValue] = useState("0");
    const [op, setOp] = useState(null);


    const CalculatorOperations = {
        "+": (firstValue, secondeValue) => firstValue + secondeValue,
        "-": (firstValue, secondeValue) => firstValue - secondeValue,
        "*": (firstValue, secondeValue) => firstValue * secondeValue,
        "/": (firstValue, secondeValue) => firstValue / secondeValue,
        "=": (firstValue, secondeValue) => secondeValue,
    }

    const handleNumber = (number) => {
        setNextValue((prevState)=>
            prevState === '0'? String(number): prevState+number
        );

    };

    const clearData = () => {
        setNextValue("0");
        setPrevValue(0);
    };

    const changeSign = () => {
        setNextValue(parseFloat(nextValue) * (-1));
    };

    const insertDot = () => {
        let reg = '/\./';
        if(!nextValue.match(reg)) {
            setNextValue(prevState => prevState + '.');
        }
    };

    const percentage = () => {
        setNextValue(prevState => prevState /100);
        if(prevValue && nextValue === '') {
            setPrevValue(prevState => prevState / 100);
        }
    };

    const performOperation = () => {
        let temp = CalculatorOperations[op](parseFloat(prevValue), parseFloat(nextValue));
        setNextValue(String(temp));
        setPrevValue(null);
        setOp(null);
    }

    const handleOperation = (value) => {
       
        if(Number.isInteger(value)) {
            handleNumber(parseInt(value,10));
        } else if(value in CalculatorOperations) {
            if(op === null) {
                setOp(value);
                setPrevValue(nextValue);
                setNextValue('');
            } 
            if(op) {
                setOp(value);
            }
            if(prevValue && op && nextValue) {
                performOperation();
            } 
        } else if(value === 'c') {
                clearData();
        } else if(value === "\xB1") {
                changeSign();
        } else if(value === '.') {
                insertDot();
        } else if(value === "%") {
                percentage();
        }  
    };


    return (
        <div className="calculator">
            <div className="screen">
                <div className='result'>{nextValue}</div>
            </div>
            <div className="keypad">
                <div className="keys-function">
                    <CalculatorKey keyValue={"c"} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={"\xB1"} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={"%"} onHandleOperation={handleOperation}/>
                </div>
                <div className="keys-operators">
                    <CalculatorKey keyValue={"+"} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={"-"} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={"*"} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={"/"} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={"="} onHandleOperation={handleOperation}/>
                </div>
                <div className="keys-numbers">
                    <CalculatorKey keyValue={9} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={8} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={7} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={6} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={5} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={4} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={3} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={2} onHandleOperation={handleOperation}/>
                    <CalculatorKey keyValue={1} onHandleOperation={handleOperation}/>
                    <CalculatorKey className='key-dot' keyValue={"."} onHandleOperation={handleOperation}/>
                    <CalculatorKey className='key-zero' keyValue={0} onHandleOperation={handleOperation}/>
                </div>
            </div>
        </div>
    )
}

export default Calculator;