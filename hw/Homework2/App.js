//import logo from './logo.svg';
//import './App.css';

// referenced checking for prime number: https://stackoverflow.com/questions/40200089/number-prime-test-in-javascript

// Makes the array with specified start and end
function MakeArr(start, end) {
    var list = [];
    for (var i = start; i <= end; i++) {
        list.push(i);
    }
    return list;
}
const primeCheck = value => {
    for (let i = 2, n = Math.sqrt(value); i <= n; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}

function ColorCode(value) {
    if (primeCheck(value)) {
        return {backgroundColor: "red", border: '4px solid black'};
    }
    else if (value % 2 === 0) {
        return {backgroundColor: "green"};
    }
    else {
        return {backgroundColor: "yellow"};
    }
}

function Grid (props) {
    /*const cells = props.arrOfObj.map(obj =>
    <div style={{backgroundColor: `${'#'+Math.random().toString(16).substr(-6)}`}}
    className="item">{obj}</div>)*/ // This currently makes each box a random color

    const cells = props.arrOfObj.map(obj =>
        <div style={ColorCode(obj)}
             className="item">{obj}</div>)
    return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(8, 145px)',
            gridGap: '1rem', gridAutoFlow: 'row', textAlign: 'center',
            justifyContent: 'space-between'}}>
            {cells}
        </div>
    )
}

function App() {
    const start = 1;
    const end = 76;
    const arrOfObj = MakeArr(start, end);
    return (
        <div className="App">
            <Grid arrOfObj={arrOfObj}/>
        </div>
    )
}

export default App;
