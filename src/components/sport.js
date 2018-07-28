import React from "react";
import { Link } from "react-router-dom";
import LocalizedStrings from 'react-localization';
// var numeral = require('numeral');
const p = "10%";
// var number;
const bookUrl = require('../data.json');
let strings = new LocalizedStrings({
    uk:{
        format: function(number){
            return number
        }
    },
    us: {
        format:"I'd liked {0}"
    }
   });


class Sport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            format:""

        }
     
    }

    static getDerivedStateFromProps(props, current_state) {

        // console.log(props.match.params);
        if (current_state.format !== props.format) {
            strings.setLanguage(props.format);
           return({
               format:props.format
           })
        }
        return null;
    }
    componentDidMount() {
        let context = this;
        // this.setState(this.props.strings)
        fetch('http://91.121.116.131/geek/api/list/model/next',{cache:"no-cache"}).then(results => {
            return results.json();
        }).then(data => {
            context.setState({
                data: data,
            })
        });

        

    }
    please(){
        alert("This event is already started or finished, no odds for pre match available");
    }
    render() {
        let raw = this.state.data;
        let table = Object.keys(raw).map(i => {
            let per = raw[i].matches;
            let matches = Object.keys(per).map(z => {
                let y = per[z];
                let min = 1, max = 5;
                let timess = new Date(y.timestamp * 1000);

                var hours = timess.getHours();
                // correct for number over 24, and negatives
                if (hours >= 24) { hours -= 24; }
                if (hours < 0) { hours += 12; }

                // add leading zero, first convert hours to string
                hours = hours + "";
                if (hours.length === 1) { hours = "0" + hours; }

                // minutes are the same on every time zone
                var minutes = timess.getMinutes();

                // add leading zero, first convert hours to string
                minutes = minutes + "";
                if (minutes.length === 1) { minutes = "0" + minutes; }


                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var dd = timess.getDate();
                dd = dd < 10 ? '0' + dd : dd;
                var today = months[timess.getMonth()] + " " + dd + ", " + timess.getFullYear();
                timess = today;

               
                let bookies = Object.keys(bookUrl);
                let olo1 = bookUrl[bookies[(Math.random() * (bookies.length - 2) + 1).toFixed(0)]];
                let olo2 = bookUrl[bookies[(Math.random() * (bookies.length - 2) + 1).toFixed(0)]];
                let olo3 = bookUrl[bookies[(Math.random() * (bookies.length - 2) + 1).toFixed(0)]];
                let olo4 = bookUrl[bookies[(Math.random() * (bookies.length - 2) + 1).toFixed(0)]];
                let olo5 = bookUrl[bookies[(Math.random() * (bookies.length - 2) + 1).toFixed(0)]];

                return (
                    <tr key={y.idmatch}>
                        <th className="text-center" style={{ width: p, fontWeight: "bolder",backgroundColor:y.status==="In Play"?"#ffd559":(y.status==="Fin"?"red":"#d3d3d34f"), color:y.status==="Fin"?"white":"black" }}>{hours + ":" + minutes}<br /><small><b>{timess}</b></small></th>
                        <td><Link to={(y.status==="Fin" || y.status==="In Play")?"#":"/match/" + y.idmatch+"/#cdate"} onClick={(y.status==="Fin" || y.status==="In Play")?this.please.bind(this,'No'):void(0)}><b>{y.name}</b></Link></td>
                        <td className="text-center" style={{ width: '7%', fontWeight: "bolder" }}>{y.results ? y.results[1].value : y.status}</td>
                      
                      
                        <td className="text-center" style={{ width: p,backgroundColor:'#007bffa8',fontWeight:"bolder" }}>
                            <a target="_blank"  id="link-2" href={olo1.url} title={"Click to go to the bookmaker site "+ olo1.name} >
                                <span className={"logos l" + olo1.idLogo}></span>
                            {y.data[19992] ? y.data[19992].o1 : (Math.random() * (max - min) + min).toFixed(2)}
                            </a>
                            </td>
                        <td className={raw[i].sportName==="Baseball"?"hide":"text-center"} style={{ width: p,backgroundColor:'#007bffa8',fontWeight:"bolder" }}>
                            <a target="_blank"  id="link-2"href={olo2.url} title={"Click to go to the bookmaker site "+ olo2.name} >
                                <span className={"logos l" + olo2.idLogo}></span>
                            {y.data[19992] ? y.data[19992].o2 : (Math.random() * (max - min) + min).toFixed(2)}
                            </a>
                            </td>
                        <td className="text-center" style={{ width: p,backgroundColor:'#007bffa8',fontWeight:"bolder" }}>
                            <a target="_blank"  id="link-2" href={olo3.url} title={"Click to go to the bookmaker site "+ olo3.name} >
                                <span className={"logos l" + olo3.idLogo}></span>
                            {y.data[19992] ? y.data[19992].o3 : (Math.random() * (max - min) + min).toFixed(2)}
                            </a>
                            </td>

                        <td className="text-center" style={{ width: p,backgroundColor:'#21a700a8',fontWeight:"bolder" }}>
                            <a target="_blank"  id="link-2" href={olo4.url} title={"Click to go to the bookmaker site "+ olo4.name} >
                                <span className={"logos l" +olo4.idLogo}></span>
                            {y.data[29992] ? y.data[29992].o1+"(> "+y.data[29992].o3+")" : (Math.random() * (max - min) + min).toFixed(2)}
                            </a>
                            </td>
                        <td className="text-center" style={{ width: p,backgroundColor:'#21a700a8',fontWeight:"bolder" }}>
                            <a target="_blank"  id="link-2" href={olo5.url} title={"Click to go to the bookmaker site "+ olo5.name} >
                                <span className={"logos l" + olo5.idLogo}></span>
                            {y.data[29992] ? y.data[29992].o2+"(< "+y.data[29992].o3+")": (Math.random() * (max - min) + min).toFixed(2)}
                            </a>
                            </td>
                    </tr>
                )
            })
            return (
                <table key={i} id={i} className="table table-sm table-bordered bg-light">
                    <thead className="table-primary">
                        <tr >
                            <th colSpan='3' >{raw[i].sportName + " " + raw[i].name}</th>
                            <th className='text-center'>1</th>
                            <th className={raw[i].sportName==="Baseball"?'hide':'text-center'}>X</th>
                            <th className='text-center'>2</th>

                             <th className='text-center'>Under</th>
                            <th className='text-center'>Over</th>
                        </tr>

                    </thead>
                    <tbody>
                        {matches}
                    </tbody>
                </table>
            )
        })



        return (
            <div className="card">
                <div className="card-body">
                    <h5>Next Matches</h5>
                    <h4>
                          {
                        // strings.formatString(strings.format, "-110")
                        }
                        </h4>
                    {table}
                </div>

            </div>
        );
    }
}
export default Sport;