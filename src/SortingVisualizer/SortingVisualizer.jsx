import React from 'react';
import {getBubbleSortAnimations, getMergeSortAnimations, getQuickSortAnimations, getHeapSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 50;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 255));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    barOneStyle.backgroundColor = calcColor(0,255,`${newHeight}`);
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i ++)
        {
            const arrayBars = document.getElementsByClassName('array-bar');
            let [barOne, barTwo, change] = animations[i];
            if(!change)
            {
                const barOneStyle = arrayBars[barOne].style;
                const barTwoStyle = arrayBars[barTwo].style;
            } else {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOne].style;
                    barOneStyle.height = `${barTwo}px`;
                    barOneStyle.backgroundColor = calcColor(0,255,`${barTwo}`);
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    heapSort() {
        const animations = getHeapSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i ++)
        {
            const arrayBars = document.getElementsByClassName('array-bar');
            let [barOne, barTwo, change] = animations[i];
            if(!change)
            {
                const barOneStyle = arrayBars[barOne].style;
                const barTwoStyle = arrayBars[barTwo].style;
            } else {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOne].style;
                    barOneStyle.height = `${barTwo}px`;
                    barOneStyle.backgroundColor = calcColor(0,255,`${barTwo}`);
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i ++)
        {
            const arrayBars = document.getElementsByClassName('array-bar');
            let [barOne, barTwo, change] = animations[i];
            if(!change)
            {
                const barOneStyle = arrayBars[barOne].style;
                const barTwoStyle = arrayBars[barTwo].style;
            } else {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOne].style;
                    barOneStyle.height = `${barTwo}px`;
                    barOneStyle.backgroundColor = calcColor(0,255,`${barTwo}`);
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    // NOTE: This method will only work if your sorting algorithms actually return
    // the sorted arrays; if they return the animations (as they currently do), then
    // this method will be broken.
    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let i = 0; i < length; i++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const mergeSortedArray = getMergeSortAnimations(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            // backgroundColor: PRIMARY_COLOR,
                            backgroundColor: calcColor(0,255,`${value}`),
                            height: `${value}px`,
                        }}></div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>

            </div>
        );
    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// From https://stackoverflow.com/questions/36687323/generate-rainbow-colors-based-on-value
function calcColor(min, max, val)
{
    var minHue = 240, maxHue=0;
    var curPercent = (val - min) / (max-min);
    var colString = "hsl(" + ((curPercent * (maxHue-minHue) ) + minHue) + ",100%,50%)";
    return colString;
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}