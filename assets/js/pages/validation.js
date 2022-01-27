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
        });

        return(
            <div className="tab-pane active" id="tab-cont">
                <div className="col-md-12">
                    <div className="panel panel-default" style={{padding: '10px'}}>
                        <div className="panel-body panel-body-table">
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
                                <tbody>{rows}</tbody>
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

const Environment = ({ prevStep, handleChange, values }) => {
    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-10">
                <h3>Environment</h3>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 1</label>
                        <input type="text" className="form-control" defaultValue={'1'} placeholder="Lingkungan 1" />
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 2</label>
                        <input type="text" className="form-control" defaultValue={'1'} placeholder="Lingkungan 2" />
                    </div>
                </div>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 3</label>
                        <input type="text" className="form-control" defaultValue={'1'} placeholder="Lingkungan 3" />
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 4</label>
                        <input type="text" className="form-control" defaultValue={'1'} placeholder="Lingkungan 4" />
                    </div>
                </div>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 5</label>
                        <input type="text" className="form-control" defaultValue={'1'} placeholder="Lingkungan 5" />
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 6</label>
                        <input type="text" className="form-control" defaultValue={'1'} placeholder="Lingkungan 6" />
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 7</label>
                        <input type="text" className="form-control" defaultValue={'1'} placeholder="Lingkungan 7" />
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 8</label>
                        <input type="text" className="form-control" defaultValue={'1'} placeholder="Lingkungan 8" />
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button style={{ marginLeft: '.5em', marginRight: '.5em' }} onClick={(e) => {
                        e.preventDefault();
                        prevStep();
                    }} className="btn btn-secondary">Prev</button>
                </div>
            </div>
        </div>
    );
}

const Spesification = ({ nextStep, prevStep, handleChange, values }) => {
    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-10">
                <h3>Spesification</h3>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Jumlah Sisi</label>
                        <select className="form-control select" id="province" name="province"></select>
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Jumlah Titik</label>
                        <input type="text" className="form-control" defaultValue={'1'} placeholder="Jumlah Titik" />
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <div className="col-md-6" style={{paddingLeft: '0'}}>
                            <label className="control-label bold">Panjang</label>
                            <input type="text" className="form-control" defaultValue={'1'} placeholder="Latitude" />
                        </div>
                        <div className="col-md-6">
                            <label className="control-label bold">Lebar</label>
                            <input type="text" className="form-control" defaultValue={'1'} placeholder="Longitude" />
                        </div>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Orientasi</label>
                        <select className="form-control select" id="province" name="province"></select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lighting</label>
                        <select className="form-control select" id="province" name="province"></select>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <div className="col-md-6" style={{paddingLeft: '0'}}>
                            <label className="control-label bold">Traffic</label>
                            <input type="text" className="form-control" defaultValue={'1'} placeholder="Latitude" />
                        </div>
                        <div className="col-md-6" style={{marginTop: '25px'}}>
                            <button className="btn btn-primary">Peta</button>
                        </div>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Score</label>
                        <input type="text" className="form-control" defaultValue={'1'} placeholder="Score" />
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Fixing</label>
                        <select className="form-control select" id="fixing" name="fixing"></select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Competition</label>
                        <select className="form-control select" id="fixing" name="fixing"></select>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Visible Distance</label>
                        <select className="form-control select" id="fixing" name="fixing"></select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Angle of Vision</label>
                        <select className="form-control select" id="fixing" name="fixing"></select>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Obstruction</label>
                        <select className="form-control select" id="fixing" name="fixing"></select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Street Lite</label>
                        <select className="form-control select" id="fixing" name="fixing"></select>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Road Type</label>
                        <select className="form-control select" id="fixing" name="fixing"></select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">OOH Status</label>
                        <div style={{ display: 'grid' }}>
                            <label className="check">
                                <input type="radio" className="iradio" checked="checked" value="1" id="ooh_status" name="ooh_status" /> 
                                Active
                            </label>
                            <label className="check">
                                <input type="radio" className="iradio" value="2" id="ooh_status" name="ooh_status" />
                                Inactive
                            </label>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button style={{ marginLeft: '.5em', marginRight: '.5em' }} onClick={(e) => {
                        e.preventDefault();
                        prevStep();
                    }} className="btn btn-secondary">Prev</button>
                    <button style={{ marginLeft: '.5em'}} onClick={(e) => {
                        e.preventDefault();
                        nextStep();
                    }} className="btn btn-primary">Next</button>
                </div>
            </div>
        </div>
    );
}

const Location = ({nextStep, prevStep, handleChange, values}) => {
    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-10">
                <h3>Location</h3>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Province</label>
                        <select className="form-control select" id="province" name="province"></select>
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">City / State</label>
                        <select className="form-control select" id="city" name="city"></select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">District</label>
                        <select className="form-control select" id="city" name="city"></select>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Address</label>
                        <input type="text" className="form-control" defaultValue={'1'} placeholder="Address" />
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <div className="col-md-5" style={{paddingLeft: '0'}}>
                            <label className="control-label bold">Latitude</label>
                            <input type="text" className="form-control" defaultValue={'1'} placeholder="Latitude" />
                        </div>
                        <div className="col-md-5">
                            <label className="control-label bold">Longitude</label>
                            <input type="text" className="form-control" defaultValue={'1'} placeholder="Longitude" />
                        </div>
                        <div className="col-md-2" style={{marginTop: '25px'}}>
                            <label className="control-label bold">&nbsp;</label>
                            <button className="btn btn-primary">Peta</button>
                        </div>
                    </div>
                    
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">View</label>
                        <input type="text" className="form-control" readOnly defaultValue={'1'} placeholder="View" />
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button style={{ marginLeft: '.5em', marginRight: '.5em' }} onClick={(e) => {
                        e.preventDefault();
                        prevStep();
                    }} className="btn btn-secondary">Prev</button>
                    <button style={{ marginLeft: '.5em'}} onClick={(e) => {
                        e.preventDefault();
                        nextStep();
                    }} className="btn btn-primary">Next</button>
                </div>
            </div>
        </div>
    )
}

const GeneralInfo = ({nextStep, handleChange, values}) => {
    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-10">
                <h3>General Info</h3>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">OOH ID</label>
                        <input type="text" className="form-control" readOnly defaultValue={'1'} placeholder="OOH ID" id="ooh_id_disabled" />
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Canvasing ID</label>
                        <input type="text" disabled="" className="form-control" placeholder="Canvasing ID" id="no_cnv_disabled" name="no_cnv_disabled" />
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">PRISMA ID</label>
                        <input type="text" className="form-control" placeholder="PRISMA ID" id="no_site" name="no_site" />
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Owner</label>
                        <select className="form-control select" id="ownerOOH" name="ownerOOH">
                            <option value="PRISMA">PRISMA</option>
                            <option value="NON-PRISMA">NON-PRISMA</option>
                        </select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Kode Produk</label>
                        <select 
                            className="form-control select" 
                            id="kode_produk" 
                            name="kode_produk" 
                            onChange={() => handleChange('kode_produk')}
                            defaultValue={values.kode_produk}
                        >
                        </select>
                    </div>
                    
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Tipe Produk</label>
                        <select 
                            className="form-control select" 
                            id="type_produk" 
                            name="type_produk"
                            onChange={(e) => handleChange({
                                type: 'kode_produk',
                                value: e.target.value
                            })}
                            defaultValue={values.type_produk}
                            >
                            <option value="H">Horizontal</option>
                            <option value="V">Vertical</option>
                            <option value="H/FL">Horizontal - Frontlite</option>
                            <option value="V/FL">Vertical - Frontlite</option>
                            <option value="H/BL">Horizontal - Backlite</option>
                            <option value="V/BL">Vertical - Backlite</option>
                        </select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Tipe OOH</label>
                        <select className="form-control select" id="ooh_type" name="ooh_type"></select>
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">OOH Status</label>
                        <div style={{ display: 'grid' }}>
                            <label className="check">
                                <input type="radio" className="iradio" checked="checked" value="1" id="ooh_status" name="ooh_status" /> 
                                Available
                            </label>
                            <label className="check">
                                <input type="radio" className="iradio" value="2" id="ooh_status" name="ooh_status" />
                                Tersewa
                            </label>
                            <label className="check"><input type="radio" className="iradio" value="3" id="ooh_status" name="ooh_status" />
                                Expired
                            </label>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button onClick={(e) => {
                        e.preventDefault();
                        nextStep();
                    }} className="btn btn-primary">Next</button>
                </div>
            </div>
        </div>
    );
}
class Info extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            step: 1,
            email: 'test@mail.com',
            kode_produk: '',
        }
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        console.log('HANDLE', {type: e.type, value: e.value});
    }

    prevStep() {
        const { step } = this.state;
        this.setState({
            step: (step - 1)
        });
        console.log("PREV", step);
    }

    nextStep() {
        const { step } = this.state;
        this.setState({
            step: (step + 1)
        });
        console.log("NEXT", step);
    }

    render(){
        const { email } = this.state;
        const values = { email };
        switch (this.state.step) {
            case 1:
                return (
                    <GeneralInfo 
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 2:
                return (
                    <Location 
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 3:
                return(
                    <Spesification
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
                case 4:
                    return(
                        <Environment
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            values={values}
                        />
                    )
            default:
                break;
        }
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
                                            <td> : </td>
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
                            <li className="active"><a href="#tab-info" role="tab" data-toggle="tab">Info</a></li>
                            <li><a href="#tab-contract" role="tab" data-toggle="tab">Contract</a></li>
                            <li><a href="#tab-content" role="tab" data-toggle="tab">Content</a></li>
                            <li><a href="#tab-score" role="tab" data-toggle="tab">Score</a></li>
                        </ul>
                        <div className="panel-body tab-content">
                            <div className="tab-pane active" id="tab-info">
                                <Info />
                                {/* <form className="form-horizontal" id="forminfo">
                                    <div className="wizard">
                                        <div id="step-1">

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">OOH ID</label>
                                                    <div className="col-md-9">
                                                        <input type="text" disabled="" className="form-control"
                                                            placeholder="OOH ID" id="ooh_id_disabled" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Canvasing ID</label>
                                                    <div className="col-md-9">
                                                        <input type="text" disabled="" className="form-control"
                                                            placeholder="Canvasing ID" id="no_cnv_disabled"
                                                            name="no_cnv_disabled" />
                                                        <input type="hidden" id="no_cnv" name="no_cnv" />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">PRISMA ID</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="PRISMA ID"
                                                            id="no_site" name="no_site" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Propinsi</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="provinceOOH" name="province"></select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Kota</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="district" name="district"></select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Kecamatan</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="sub_district" name="sub_district"></select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Alamat</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="Alamat" id="address" name="address" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Latitude</label>
                                                    <div className="col-md-3">
                                                        <input type="text" className="form-control" placeholder="Latitude" id="latitude" name="latitude" />
                                                    </div>
                                                    <label className="col-md-3 control-label">Longitude</label>
                                                    <div className="col-md-3">
                                                        <input type="text" className="form-control" placeholder="Longitude" id="longitude" name="longitude" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Kode Produk</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="kode_produk" name="kode_produk"></select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">OOH Status</label>
                                                    <div className="col-md-9">
                                                        <div className="col-md-4">
                                                            <label className="check"><input type="radio" className="iradio"
                                                                    checked="checked" value="1" id="ooh_status"
                                                                    name="ooh_status" /> Available</label>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="check">
                                                                <input type="radio" className="iradio" value="2" id="ooh_status" name="ooh_status" />
                                                                Tersewa
                                                            </label>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="check"><input type="radio" className="iradio" value="3" id="ooh_status" name="ooh_status" />
                                                                Expired
                                                            </label>
                                                        </div>
                                                        <br />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">OOH Tipe</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="ooh_type"
                                                            name="ooh_type">
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Jumlah Sisi</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="jumlah_sisi"
                                                            name="jumlah_sisi">
                                                            <option value="1">1 Sisi</option>
                                                            <option value="2">2 Sisi</option>
                                                            <option value="3">3 Sisi</option>
                                                            <option value="4">4 Sisi</option>
                                                            <option value="5">5 Sisi</option>
                                                            <option value="6">6+ Sisi</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="step-2">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Jumlah Titik</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="Angka" id="jumlah_set" name="jumlah_set" value="1" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Panjang</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="..M" id="panjang" name="panjang" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Lebar</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="..M" id="lebar" name="lebar" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Orientasi</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="orientasi" name="orientasi">
                                                            <option value="1">Vertical</option>
                                                            <option value="2">Horizontal</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Lighting</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="lighting" name="Lightning">
                                                            <option value="1">Frontlite</option>
                                                            <option value="2">Backlite</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">View</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="View" id="view" name="view" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Traffic</label>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control" placeholder="Traffic" id="traffic" name="traffic" value="0" />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <span className="btn btn-primary btn-small" data-toggle="tooltip" data-placement="right" title="Getting traffic data from this geo location.">Get
                                                            Traffic Data 
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Score</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" id="vscore" name="vscore" placeholder="VAS" value="0" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    
                                                </div>
                                                <div className="form-group" data-lvsd="inventory-edit-price">
                                                    <label className="col-md-3 control-label">Rate Card</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="Rate Card" id="rate_card" name="rate_card" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="step-3">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Lingkungan 1</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="Lingkungan 1" id="lingkungan1" name="lingkungan1" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Lingkungan 2</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="Lingkungan 2" id="lingkungan2" name="lingkungan2" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Lingkungan 3</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="Lingkungan 3" id="lingkungan3" name="lingkungan3" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Lingkungan 4</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="Lingkungan 4" id="lingkungan4" name="lingkungan4" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Lingkungan 5</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="Lingkungan 5" id="lingkungan5" name="lingkungan5" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Lingkungan 6</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="Lingkungan 6" id="lingkungan6" name="lingkungan6" />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Lingkungan 7</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="Lingkungan 7" id="lingkungan7" name="lingkungan7" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Lingkungan 8</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" placeholder="Lingkungan 8" id="lingkungan8" name="lingkungan8" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Fixing</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="fixing" name="fixing">
                                                            <option value="Uni-Pole">Uni-Pole</option>
                                                            <option value="Duo-Pole">Duo-Pole</option>
                                                            <option value="Three-Pole">Three-Pole</option>
                                                            <option value="Wall Mounted">Wall Mounted</option>
                                                            <option value="Free Standing">Free Standing</option>
                                                            <option value="Hanging">Hanging</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Competition</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="competition"
                                                            name="competition">
                                                            <option value="None">None</option>
                                                            <option value="1 Site">1 Site</option>
                                                            <option value="2 Sites">2 Sites</option>
                                                            <option value="3 Sites">3 Sites</option>
                                                            <option value="4 Sites">4 Sites</option>
                                                            <option value="5 Sites">5 Sites</option>
                                                            <option value="6+ Sites">6+ Sites</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Visible Distance</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="visible_distance"
                                                            name="visible_distance">
                                                            <option value="0-25m">0-25m</option>
                                                            <option value="25-50m">25-50m</option>
                                                            <option value="50-100m">50-100m</option>
                                                            <option value="100-200m">100-200m</option>
                                                            <option value="200m+">200m+</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Angle Of Vision</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="angle_of_vision"
                                                            name="angle_of_vision">
                                                            <option value="Head On">Head On</option>
                                                            <option value="Nearside - Angled Toward">Nearside - Angled
                                                                Toward</option>
                                                            <option value="Offside - Angled Toward">Offside - Angled
                                                                Toward</option>
                                                            <option value="Nearside - Angled Away">Nearside - Angled
                                                                Away</option>
                                                            <option value="Offside - Angled Away">Offside - Angled Away
                                                            </option>
                                                            <option value="Nearside - Parallel to the Road">Nearside -
                                                                Parallel to the Road</option>
                                                            <option value="Offside - Parallel to the Road">Offside -
                                                                Parallel to the Road</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Obstruction</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="obstruction"
                                                            name="obstruction">
                                                            <option value="None">None (0%)</option>
                                                            <option value="Slight">Slight (0-20%)</option>
                                                            <option value="Moderate">Moderate (20-50%)</option>
                                                            <option value="Severe">Severe ({'>'}50%)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Street Lite</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="street_lite"
                                                            name="street_lite">
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">Road Type</label>
                                                    <div className="col-md-9">
                                                        <select className="form-control select" id="road_type"
                                                            name="road_type">
                                                            <option value="Single Carriage">Single Carriage</option>
                                                            <option value="Dual Carriages">Dual Carriages</option>
                                                            <option value="3+ Carriages">3+ Carriages</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-3 control-label">OOH Flag</label>
                                                    <div className="col-md-9">
                                                        <div className="col-md-6">
                                                            <label className="check"><input type="radio" className="iradio"
                                                                    name="ooh_flag" value="1" checked="checked" />
                                                                Active</label>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="check"><input type="radio" className="iradio"
                                                                    name="ooh_flag" value="0" /> Inactive</label>
                                                        </div>
                                                        <br />
                                                    </div>
                                                </div>
                                                <input type="hidden" id="ooh_id" name="ooh_id" />
                                            </div>
                                        </div>
                                    </div>
                                </form> */}
                            </div>

                            <div className="tab-pane" id="tab-contract">
                                <div>Contract</div>
                            </div>
                            <div className="tab-pane" id="tab-content">
                                <div>Content</div>
                            </div>
                            <div className="tab-pane" id="tab-score">
                                <div>Score</div>
                            </div>
                        </div>
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