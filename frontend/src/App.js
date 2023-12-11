import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from "react"
import axios from "axios"
import DataTable from 'react-data-table-component';


function App() {

  let [columns,setColumns] = useState([])
  let [data,setData] = useState([])
  let [sqlText,setSqlText] = useState("")

  let getColums = async (cols) => {
    console.log(cols)
    let col =  await cols.map(x => {
        return {
          name: x,
          selector: x,
          sortable:true
        }
    })
    console.log(col)
    return col
  }
 let runSql = async (e) => {
  e.preventDefault()
  let result = await axios.post( "http://localhost:5000/sql/",{
  //   headers: {
  //     'Content-Type': 'application/text',
  // },
  query : sqlText})
  if(result.data.status == "Success") {
    if(result.data.data.length > 0) {
      console.log(result.data.columns)
       let col = await getColums(result.data.columns)
       console.log(col)
      setColumns(col)
      setData(result.data.data)
    }
  }
  console.log(result)
 }
 
  return (
    <div className="App">
      <div class="container text-center">
      <div class="row">
        <div class="col-xs-12">
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Enter your Query</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={ (x) => setSqlText(x.target.value)} value={sqlText}></textarea>
          </div>
        </div>
        <div class="col-xs-12">
           <button type="button" class="btn btn-primary" onClick={runSql}>Run SQL</button>
        </div>
        <div class="col-xs-12">
          
      <DataTable
            columns={columns }
            data={data}
        />
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
