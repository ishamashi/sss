import Services from './../services/services.js';
import DataTable from 'react-data-table-component';
import { HashRouter as Router, Link, Route  } from 'react-router-dom';

class Table extends React.Component {
    constructor(props){
        super(props);
    }
    
    renderTable(){
        $('#dataTable').dataTable({            
            destroy: true,
            ordering: false,
            columnDefs: [
                { "width": "1%", "targets": 0 },
                { "width": "5%", "targets": 9 },
            ],
        });
    }

    async componentDidMount(){
        // console.log("GET TEST", await Services.test());
    }

    componentDidUpdate(){
        this.renderTable();
    }

    render(){
        const Link = ReactRouterDOM.Link;
        const rows = this.props.data.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.no}</td>
                    <td>{item.no_cnv}</td>
                    <td>{item.prisma_id}</td>
                    <td>{item.district}</td>
                    <td>{item.address}</td>
                    <td>{item.type}</td>
                    <td>{item.size}</td>
                    <td>{item.traffic}</td>
                    <td>{item.price}</td>
                    <td>
                        <Link to={`/request/${this.props.type}/${index}`}>
                            <button className='btn btn-primary'>TEST</button>
                        </Link>
                    </td>
                </tr>
            )
        })
        return(
            <div className="tab-pane active" id="tab-cont">
                <div className="col-md-12">
                    <div className="panel panel-default" style={{padding: '10px'}}>
                        <div className="panel-body panel-body-table">
                            {/* <DataTable title="YourBlogCoach" columns={columns} data={data} /> */}
                            <table id="dataTable" style={{borderBottom: '1px solid #E5E5E5'}} className="table table-sm table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center" width="1%">No</th>
                                        <th className="">Canvassing ID</th>
                                        <th className="">Prisma ID</th>
                                        <th className="">District</th>
                                        <th className="">Address</th>
                                        <th className="">Type</th>
                                        <th className="">Size</th>
                                        <th className="">Traffic</th>
                                        <th className="">Price</th>
                                        <th className="">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            liked: false,
            header: {
                title: 'Validation',
                sub: '',
            },
            tab: 'Add',
            dataTable: [],
        }
    }

    getDataTable(){
        var data = [{
            "no": "1",
            "no_cnv": "2312312",
            "prisma_id": "TEST AA",
            "district": "Tokyo",
            "address": "ASS",
            "type": "1",
            "size": "122",
            "traffic": "1123",
            "price": "$162,700",
            "action": "",
          },
          {
            "no": "1",
            "no_cnv": "2312312",
            "prisma_id": "TEST AA",
            "district": "Tokyo",
            "address": "ASS",
            "type": "1",
            "size": "122",
            "traffic": "1123",
            "price": "$162,700",
            "action": "",
          }];
        
          return data;
    }

    componentDidMount(){
        this.setState({
            tab: this.state.tab,
            header: this.state.header,
            dataTable: this.getDataTable(this.state.tab),
        })
    }

    handleClick(tab){
        this.setState({
            tab: tab,
            header: this.state.header,
            dataTable: this.getDataTable(tab),
        })
    }

    render(){
        return (
            <div>
                <h1>{this.state.header.title}</h1>
                <div className="form-horizontal">
                    <div className="panel panel-default tabs">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="active"><a onClick={() => this.handleClick('Add')} href="#tab-add" role="tab" data-toggle="tab">Add</a></li>
                            <li><a onClick={() => this.handleClick('Updated')} href="#tab-updated" role="tab" data-toggle="tab">Update</a></li>
                            <li><a onClick={() => this.handleClick('Rejected')} href="#tab-rejected" role="tab" data-toggle="tab">Rejected</a></li>
                        </ul>
                        <div className="panel-body tab-content">
                            <Table data={this.state.dataTable} type={this.state.tab} {...this.props}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Request extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const Link = ReactRouterDOM.Link;
        const { type, no_cnv } = this.props.match.params;
        console.log({
            type,
            no_cnv
        });
        return(
            <div>
                <h1>Request Validation: { type }</h1>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className="panel panel-default">
                            <div className="panel-body" style={{border: '1px solid #ddd', borderRadius: '.5em'}}>
                                <table className="">
                                    <tbody>
                                        <tr>
                                            <th style={{ width: '20%' }}><span style={{marginRight: '1em'}}>Canvasser</span></th>
                                            <td > : </td>
                                            <td>Jonny</td>
                                        </tr>
                                        <tr>
                                            <th style={{ width: '20%' }}><span style={{marginRight: '1em'}}>Submit Date</span></th>
                                            <td > : </td>
                                            <td>14 Jan 2022</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="panel panel-default tabs">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="active"><a onClick={''} href="#tab-add" role="tab" data-toggle="tab">Info</a></li>
                            <li><a onClick={''} href="#tab-updated" role="tab" data-toggle="tab">Contract</a></li>
                            <li><a onClick={''} href="#tab-rejected" role="tab" data-toggle="tab">Content</a></li>
                            <li><a onClick={''} href="#tab-rejected" role="tab" data-toggle="tab">Score</a></li>
                        </ul>
                        <div className="panel-body tab-content"></div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'end'}}>
                        <Link to="/" className='btn btn-outline-primary' style={{ marginLeft: '.5em', marginRight: '.5em' }}>Back</Link>
                        <button className='btn btn-danger' style={{ marginLeft: '.5em', marginRight: '.5em' }}>Reject</button>
                        <button className='btn btn-primary' style={{ marginLeft: '.5em', marginRight: '.5em' }}>Approve</button>
                    </div>
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    render(){
        const Link = ReactRouterDOM.Link;
        const Route = ReactRouterDOM.Route;

        return(
            <ReactRouterDOM.HashRouter>
                <Route exact path="/" component={Home} />
                <Route path="/request/:type/:no_cnv" component={Request} />
            </ReactRouterDOM.HashRouter>
        )
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<App />, domContainer);