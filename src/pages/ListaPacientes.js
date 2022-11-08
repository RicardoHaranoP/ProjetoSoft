
import {MdAccountCircle} from 'react-icons/md';
import {MdAddCircle} from 'react-icons/md';
import './ListaPacientDent.css';
import 'rsuite/dist/rsuite.min.css';
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;



const data = [
    {"id":1,"first_name":"Phillipp","last_name":"Fairham","email":"pfairham0@ehow.com","gender":"Male"},
    {"id":2,"first_name":"Errick","last_name":"Coots","email":"ecoots1@yellowpages.com","gender":"Male"},
    {"id":3,"first_name":"Gunter","last_name":"Kyme","email":"gkyme2@livejournal.com","gender":"Male"},
    {"id":4,"first_name":"Natalya","last_name":"Sawdon","email":"nsawdon3@msu.edu","gender":"Female"},
    {"id":5,"first_name":"Lea","last_name":"Gudger","email":"lgudger4@chicagotribune.com","gender":"Female"},
    {"id":6,"first_name":"Zechariah","last_name":"MacNeish","email":"zmacneish5@ameblo.jp","gender":"Male"},
    {"id":7,"first_name":"Teriann","last_name":"Vassar","email":"tvassar6@discuz.net","gender":"Female"},
    {"id":8,"first_name":"Roxana","last_name":"Hessay","email":"rhessay7@ft.com","gender":"Polygender"},
    {"id":9,"first_name":"Abran","last_name":"Zupa","email":"azupa8@businessweek.com","gender":"Male"},
    {"id":10,"first_name":"Julee","last_name":"Petracco","email":"jpetracco9@spiegel.de","gender":"Bigender"},
    {"id":11,"first_name":"Patience","last_name":"Iley","email":"pileya@statcounter.com","gender":"Female"},
    {"id":12,"first_name":"Petey","last_name":"Alten","email":"paltenb@mtv.com","gender":"Male"},
    {"id":13,"first_name":"Vivian","last_name":"Matthaus","email":"vmatthausc@vk.com","gender":"Female"},
    {"id":14,"first_name":"Juan","last_name":"Brierley","email":"jbrierleyd@deviantart.com","gender":"Male"},
    {"id":15,"first_name":"Paulie","last_name":"Origan","email":"porigane@theguardian.com","gender":"Female"},
    {"id":16,"first_name":"Jeff","last_name":"Levay","email":"jlevayf@hibu.com","gender":"Male"},
    {"id":17,"first_name":"Wynn","last_name":"Braime","email":"wbraimeg@lycos.com","gender":"Female"},
    {"id":18,"first_name":"Daryle","last_name":"Doyle","email":"ddoyleh@ed.gov","gender":"Male"},
    {"id":19,"first_name":"Jessi","last_name":"Ivey","email":"jiveyi@seesaa.net","gender":"Genderfluid"},
    {"id":20,"first_name":"Ramsay","last_name":"Meyrick","email":"rmeyrickj@usgs.gov","gender":"Male"},
    {"id":21,"first_name":"Cheslie","last_name":"Elgood","email":"celgoodk@t-online.de","gender":"Female"},
    {"id":22,"first_name":"Harper","last_name":"Merriton","email":"hmerritonl@comsenz.com","gender":"Male"},
    {"id":23,"first_name":"Joyan","last_name":"Milmore","email":"jmilmorem@youtu.be","gender":"Female"},
    {"id":24,"first_name":"Suzann","last_name":"McElvogue","email":"smcelvoguen@hc360.com","gender":"Agender"},
    {"id":25,"first_name":"Cristen","last_name":"Mensler","email":"cmenslero@amazon.co.jp","gender":"Female"},
    {"id":26,"first_name":"Fairfax","last_name":"MacMechan","email":"fmacmechanp@home.pl","gender":"Male"},
    {"id":27,"first_name":"Gillian","last_name":"Dudny","email":"gdudnyq@webmd.com","gender":"Female"},
    {"id":28,"first_name":"North","last_name":"Yuryichev","email":"nyuryichevr@indiegogo.com","gender":"Non-binary"},
    {"id":29,"first_name":"Ann-marie","last_name":"Dankov","email":"adankovs@psu.edu","gender":"Female"},
    {"id":30,"first_name":"Marie-jeanne","last_name":"Portlock","email":"mportlockt@163.com","gender":"Female"}
    ]

 

/*
<Column width={150}>
                            <HeaderCell>First Name</HeaderCell>
                            <Cell dataKey="first_name" />
                        </Column>

                        <Column width={150}>
                            <HeaderCell>Last Name</HeaderCell>
                            <Cell dataKey="last_name" />
                        </Column>

                        <Column width={100}>
                            <HeaderCell>Gender</HeaderCell>
                            <Cell dataKey="gender" />
                        </Column>
                        <Column width={300}>
                            <HeaderCell>Email</HeaderCell>
                            <Cell dataKey="email" />
                        </Column>
                                                <Column width={80} fixed="right">
                            <HeaderCell>...</HeaderCell>

                            <Cell>
                            {rowData => (
                                <span>
                                <a onClick={() => alert(`id:${rowData.id}`)}> Edit </a>
                                </span>
                            )}
                            </Cell>
                        </Column>
*/


export default function ListaPacientes() {
    return(
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className='w-100 d-flex justify-content-between'>
                        <h2 className="mb-4 mt-0">Pacientes</h2>
                        <div>
                            <a className="novo" role="button"><MdAddCircle size={30}/>Novo Paciente</a>
                        </div>
                    </div>                        
                </div>
                
                <Table
                    height={400}
                    data={data}
                    onRowClick={rowData => {
                        console.log(rowData);
                    }}
                    >
                        <Column width={60} align="center" fixed>
                            <HeaderCell>Id</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>
                        


                    </Table>
                
            </div>
        </div>
    )
}