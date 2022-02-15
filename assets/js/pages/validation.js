import services from "../services/services";
import common from "../helpers/common";


class Score extends React.Component {
    constructor(props){
        super(props);
        const { data } = props;
        this.state = {
            review: [{
                title: 'Ukuran OOH',
                values: [{
                    name: 'quest001',
                    text: '< 6 m2',
                    value: 1
                },{
                    name: 'quest001',
                    text: '6 - 12 m2',
                    value: 2
                },{
                    name: 'quest001',
                    text: '13 - 24 m2',
                    value: 3
                },{
                    name: 'quest001',
                    text: '25 - 31 m2',
                    value: 4
                },{
                    name: 'quest001',
                    text: '> 32 m2',
                    value: 5
                }]
            },{
                title: 'Jumlah OOH di sekitar',
                values: [{
                    name: 'quest002',
                    text: '> 7',
                    value: 1
                },{
                    name: 'quest002',
                    text: '5 - 7',
                    value: 2
                },{
                    name: 'quest002',
                    text: '3 - 5',
                    value: 3
                },{
                    name: 'quest002',
                    text: '2',
                    value: 4
                },{
                    name: 'quest002',
                    text: '1',
                    value: 5
                }]
            },{
                title: 'Lokasi OOH',
                values: [{
                    name: 'quest003',
                    text: 'Pemukiman',
                    value: 1
                },{
                    name: 'quest003',
                    text: 'Public Transport Stations',
                    value: 2
                },{
                    name: 'quest003',
                    text: 'Perkantoran',
                    value: 3
                },{
                    name: 'quest003',
                    text: 'Hangout Place',
                    value: 4
                },{
                    name: 'quest003',
                    text: 'Landmark',
                    value: 5
                }]
            },{
                title: 'Arah pandang ke OOH',
                values: [{
                    name: 'quest004',
                    text: 'Cross Opposite',
                    value: 1
                },{
                    name: 'quest004',
                    text: 'Kanan jalan',
                    value: 2
                },{
                    name: 'quest004',
                    text: 'Paralel',
                    value: 3
                },{
                    name: 'quest004',
                    text: 'Kiri jalan',
                    value: 4
                },{
                    name: 'quest004',
                    text: 'Frontal / Jarak pandang lebar',
                    value: 5
                }]
            },{
                title: 'Posisi OOH',
                values: [{
                    name: 'quest005',
                    text: 'Sisi Jalan',
                    value: 1
                },{
                    name: 'quest005',
                    text: 'Tikungan Jalan',
                    value: 2
                },{
                    name: 'quest005',
                    text: 'Trotoar',
                    value: 3
                },{
                    name: 'quest005',
                    text: 'Pertigaan/persimpangan jalan, termasuk perempatan jalan yang tidak memiliki lampu merah',
                    value: 4
                },{
                    name: 'quest005',
                    text: 'Perempatan Lampu Merah',
                    value: 5
                }]
            },{
                title: 'Jarak pandang ke OOH',
                values: [{
                    name: 'quest006',
                    text: '< 10 m',
                    value: 1
                },{
                    name: 'quest006',
                    text: '10 - 24 m',
                    value: 2
                },{
                    name: 'quest006',
                    text: '25 - 49 m',
                    value: 3
                },{
                    name: 'quest006',
                    text: '50 - 99 m',
                    value: 4
                },{
                    name: 'quest006',
                    text: '> 100 m',
                    value: 5
                }]
            },{
                title: 'Traffic',
                values: [{
                    name: 'quest007',
                    text: '< 20,000 vehicle/day',
                    value: 1
                },{
                    name: 'quest007',
                    text: '20,000 - 50,000 vehicle/day',
                    value: 2
                },{
                    name: 'quest007',
                    text: '50,001 - 80,000 vehicle/day',
                    value: 3
                },{
                    name: 'quest007',
                    text: '80,001 - 100,000 vehicle/day',
                    value: 4
                },{
                    name: 'quest007',
                    text: '> 100,000 vehicle/day',
                    value: 5
                }]
            },{
                title: 'Rata-rata kecepatan kendaraan',
                values: [{
                    name: 'quest008',
                    text: '< 60 km/jam',
                    value: 1
                },{
                    name: 'quest008',
                    text: '40 - 60 km/jam',
                    value: 2
                },{
                    name: 'quest008',
                    text: '20 - 40 km/jam',
                    value: 3
                },{
                    name: 'quest008',
                    text: '10 - 20 km/jam',
                    value: 4
                },{
                    name: 'quest008',
                    text: '> 10 km/jam',
                    value: 5
                }]
            },{
                title: 'Jarak dengan OOH competitor',
                values: [{
                    name: 'quest009',
                    text: '81 - 150 m',
                    value: 1
                },{
                    name: 'quest009',
                    text: '30 - 80 m',
                    value: 2
                },{
                    name: 'quest009',
                    text: '81 - 150 m',
                    value: 3
                },{
                    name: 'quest009',
                    text: '151 - 200 m',
                    value: 4
                },{
                    name: 'quest009',
                    text: '> 200 m',
                    value: 5
                }]
            },{
                title: 'Clear view (dari pohon, kabel, OOH lain, dll)',
                values: [{
                    name: 'quest010',
                    text: '80%',
                    value: 1
                },{
                    name: 'quest010',
                    text: '85%',
                    value: 2
                },{
                    name: 'quest010',
                    text: '90%',
                    value: 3
                },{
                    name: 'quest010',
                    text: '95%',
                    value: 4
                },{
                    name: 'quest010',
                    text: '100%',
                    value: 5
                }]
            },{
                title: 'Kelas Jalan',
                values: [{
                    name: 'quest011',
                    text: 'Lingkungan',
                    value: 1
                },{
                    name: 'quest011',
                    text: 'Ekonomi 2',
                    value: 2
                },{
                    name: 'quest011',
                    text: 'Ekonomi 1',
                    value: 3
                },{
                    name: 'quest011',
                    text: 'Premium Area',
                    value: 4
                },{
                    name: 'quest011',
                    text: 'Protokol',
                    value: 5
                }]
            }],
            currentScore: 0,
            newScore: 0,
            checked: [{
                name: 'quest001',
                value: 0
            },{
                name: 'quest002',
                value: 0
            },{
                name: 'quest003',
                value: 0
            },{
                name: 'quest004',
                value: 0
            },{
                name: 'quest005',
                value: 0
            },{
                name: 'quest006',
                value: 0
            },{
                name: 'quest007',
                value: 0
            },{
                name: 'quest008',
                value: 0
            },{
                name: 'quest009',
                value: 0
            },{
                name: 'quest010',
                value: 0
            },{
                name: 'quest011',
                value: 0
            }],
            ooh_id: data.ooh_id,
        }
    }

    handleCallback(){
        const { newScore, checked, ooh_id } = this.state;
        var temp = checked;
        temp.vas_score = newScore,
        temp.ooh_id = ooh_id;
        this.props.callBack(temp);
    }

    calculateScore(){
        var score = 0;
        var idx = 0;
        $("input[type=radio][data-score]:checked").each(function (i, el) {
            score += +$(el).data("score");
           idx += 1;
        });
        var maxval = 5 * idx;
        var vscore = parseFloat((score / maxval) * 100).toFixed(2);
        this.setState({
            newScore: vscore
        });
    }

    async componentDidMount(){
        let score = await services.getDataVasContent(this.state.ooh_id);
        if(typeof score.vas_score !== 'undefined'){
            this.setState({
                currentScore: score.vas_score,
                newScore: score.vas_score,
                checked: Object.entries(score).map((item) => {
                    return {
                        name: item[0],
                        value: item[1]
                    }
                }),
            });
        }
    }

    checkedSocre(name, value){
        const { checked } = this.state;
        let isChecked = false;
        checked.forEach((itemChecked) => {
            if(itemChecked.name == name && parseInt(value) === parseInt(itemChecked.value)){ 
                isChecked = true;
            }
        });
        return isChecked;
    }

    render(){
        const { checked, currentScore, newScore } = this.state;
        return(
            <div>
                <h3>Score</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr style={{background: '#4e5e6a', color: 'white'}}>
                            <th>Point Review</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.review.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                         {item.values.map((subItem, subIndex) => {
                                             return (
                                                 <td key={subIndex}>
                                                     <label className="check">
                                                         <input 
                                                            type="radio" 
                                                            className="iradio" 
                                                            value={subItem.value} 
                                                            name={subItem.name} 
                                                            checked={this.checkedSocre(subItem.name, subItem.value)} 
                                                            data-score={subItem.value}
                                                            onChange={(e) => {
                                                                this.setState({
                                                                    checked: checked.map((itemChecked) => {
                                                                        if(itemChecked.name === subItem.name){
                                                                            return {
                                                                                name: itemChecked.name,
                                                                                value: e.target.value
                                                                            }
                                                                        }else{
                                                                            return {
                                                                                name: itemChecked.name,
                                                                                value: itemChecked.value
                                                                            }
                                                                        }
                                                                    }),
                                                                }, () => {
                                                                    this.handleCallback();
                                                                });
                                                                this.calculateScore();
                                                            }}
                                                        /> 
                                                         {subItem.text}
                                                     </label>
                                                 </td>
                                             )
                                         })}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <div className="row" style={{ display: 'flex', justifyContent: 'right' }}>
                    <div className="col-md-2" style={{marginLeft: '.5em', marginRight: '.5em'}}>
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                Current Score
                            </div>
                            <div className="panel-body">
                                <span className="h1" id="vscore_current">{currentScore}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2" style={{marginLeft: '.5em', marginRight: '.5em'}}>
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                New Score
                            </div>
                            <div className="panel-body">
                                <span className="h1" id="score">{newScore}</span>
                                <input type="hidden" id="vasscore" name="vasscore" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class Content extends React.Component {
    constructor(props){
        super(props);
        const { conthis, ooh_id } = props.data;
        this.state = {
            periode: [],
            conthis: conthis || [],
            selectedYear: '',
            selectedMonth: '',
            months: [],
            contents: [],
            slots: [],
            selectedSlot: '',
            selectedContent: {},
            industry: [],
            sub_industry: [],
            advertiser: [],
            ooh_id: ooh_id || '',
            dataContract: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    filterContent(){
        const { conthis } = this.state;
        const getUniqueYear = [...new Set(conthis.map(item => item.year))]; // [ 'A', 'B']
        return getUniqueYear.map((item) => {

            var getMonths = [...new Set(conthis.map((subItem) => {
                if(subItem.year === item){
                    return subItem.month
                }
            }))];

            return {
                year: item,
                months: getMonths.map((month) => {
                    return {
                        month,
                        name: this.getMonthName(month),
                        data: conthis.filter((filter) => filter.year === item && filter.month === month)
                    }
                })
            }
        })
    }

    getMonthName(value){
        var names = {
            '1': 'January',
            '2': 'February',
            '3': 'March',
            '4': 'April',
            '5': 'May',
            '6': 'June',
            '7': 'July',
            '8': 'August',
            '9': 'September',
            '10': 'October',
            '11': 'November',
            '12': 'December',
        }

        return names[value];
    }

    checkActive(key, content_id){
        const { selectedSlot } = this.state;
        var selected = "";
        if(content_id === selectedSlot){
            selected = "btn-primary";
        }else if(content_id !== ""){
            selected = "btn-outline-primary";
        }
        return selected;
    }

    handleChange(e){
        const { selectedContent } = this.state;
        var tempChange = selectedContent;
        tempChange[e.key] = e.value;

        this.setState({
            selectedContent: tempChange
        }, () => {
            this.assignContentToState();
        })
    }

    assignContentToState(){
        const { selectedContent, conthis } = this.state;
        var tempConthis = conthis;
        tempConthis = tempConthis.map((item) => {
            if(item.content_id == selectedContent.content_id){
                return selectedContent;
            }else{
                return item;
            }
        });

        this.setState({
            conthis: tempConthis,
        }, () => {
            this.handleCallback();
        });

        this.refreshPeriode();
    }

    async componentDidMount(){
        const { ooh_id } = this.state;
        this.refreshPeriode();
        let getIndustry = await services.filterIndustry('ind');
        let getSubIndustry = await services.filterIndustry('subind');
        let getAdvertiser = await services.filterIndustry('adv');
        let getContract = await services.getDataContract(ooh_id);

        this.setState({
            industry: getIndustry,
            sub_industry: getSubIndustry,
            advertiser: getAdvertiser,
            dataContract: getContract
        });
    }

    refreshPeriode(){
        this.setState({
            periode: this.filterContent()
        });
    }

    componentDidUpdate(){
        $('#contentIndustry, #contentSubIndustry, #contentAdvertiser, #dataContract').selectpicker('refresh');
    }

    handleCallback(){
        this.props.callBack(this.state.conthis);
    }

    render(){
        const { periode, selectedYear, selectedMonth, months, contents, selectedSlot, dataContract, selectedContent, industry, sub_industry, advertiser } = this.state;
        return(
            <div>
                <h3>Content</h3>
                <div className="form-group">
                    <div className="col-md-4" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <div className="col-md-6">
                            <label className="control-label bold">Year</label>
                            <select className="form-control" value={selectedYear} onChange={(e) => {
                                this.setState({
                                    selectedYear: e.target.value,
                                    months: periode.find((filter) => filter.year == e.target.value).months,
                                    selectedMonth: '',
                                });
                            }}>
                                <option value={''}>Pilih</option>
                                {
                                    periode.map((item, index) => {
                                        return (
                                            <option key={index} value={item.year}>{item.year}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-6">
                        <label className="control-label bold">Month</label>
                            <select className="form-control" value={selectedMonth} onChange={(e) => {
                                    var contents = periode.find((item) => item.year == selectedYear).months.find((item) => item.month == e.target.value).data;
                                    this.setState({
                                        selectedMonth: e.target.value,
                                        contents: contents,
                                        selectedSlot: contents[0].content_id,
                                        selectedContent: contents[0]
                                    });
                                    // console.log("IMAGE>>>>", {
                                    //     image_day: common.checkErrorImg(contents[0].image_day),
                                    //     image_night: common.checkErrorImg(contents[0].image_night),
                                    // });
                                    this.assignContentToState();
                                }}>
                                <option value={''}>Pilih</option>
                                {
                                    months.sort((a, b) => a.month - b.month).map((item, index) => {
                                        return (
                                            <option key={index} value={item.month}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <h4>Slot</h4>
                <div>
                    {
                        [...Array(8).keys()].map((item, key) => {
                            let btnProp = {
                                disabled: false,
                                className: '',
                                content_id: '',
                            }
                            if(contents.length > 0){    
                                if(key === 0 && typeof contents[key] !== 'undefined' && !contents[key].validated){
                                    btnProp = {
                                        disabled: false,
                                        className: 'btn-primary',
                                        content_id: contents[key].content_id
                                    }
                                }else if(key !== 0 && typeof contents[key] !== 'undefined' && !contents[key].validated){
                                    btnProp = {
                                        disabled: false,
                                        className: 'btn-outline-primary',
                                        content_id: contents[key].content_id
                                    }
                                }

                                return(
                                    <button 
                                        key={key} 
                                        disabled={btnProp.disabled} 
                                        className={`btn ${this.checkActive(key, btnProp.content_id)}`} 
                                        style={{marginLeft: '.5em', marginRight: '.5em'}}
                                        onClick={() => {
                                            if(typeof contents[key] !== 'undefined' && !contents[key].validated){
                                                this.assignContentToState();
                                                this.setState({
                                                    selectedSlot: contents[key].content_id,
                                                    selectedContent: contents[key]
                                                });
                                            }
                                        }}
                                    >
                                        {(key + 1)}
                                    </button>
                                )
                            }else{
                                return(
                                    <button key={key} disabled={true} className="btn" style={{marginLeft: '.5em', marginRight: '.5em', background: 'white'}}>{(item + 1)}</button>
                                )
                            }
                        })
                    }
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'start' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Contract</label>
                        <select 
                            className="form-control select" 
                            id="dataContract" 
                            name="contract" 
                            value={selectedContent.contract_id}
                            onChange={(e) => {
                                var value = e.target.value;
                                this.handleChange({
                                    key: 'contract_id',
                                    value,
                                });
                            }}
                        >
                            {
                                dataContract.map((item, index) => {
                                    return(
                                        <option key={index} value={item.contract_id}>{item.cmp_name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="col-md-3" style={{ paddingLeft: '1em', paddingRight: '1em', display: 'grid' }}>
                        <label className="control-label bold">&nbsp;</label>
                        <input type="button" className="btn btn-primary" value="Reset Button"/>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Industry</label>
                        <select 
                            className="form-control select" 
                            id="contentIndustry" 
                            name="industry" 
                            value={selectedContent.industry}
                            data-live-search="true"
                            onChange={(e) => {
                                var value = e.target.value;
                                this.handleChange({
                                    key: 'industry',
                                    value,
                                });

                                var filterSubInd = sub_industry.filter((item) => item.ind_id == value);
                                if(filterSubInd.length > 0){
                                    var filterAdv = advertiser.filter((item) => item.subind_id == filterSubInd[0].id);                                    
                                    if(filterAdv.length > 0){
                                        this.handleChange({
                                            key: 'advertiser',
                                            value: filterAdv[0].id,
                                        });
                                    }

                                    this.handleChange({
                                        key: 'sub_industry',
                                        value: filterSubInd[0].id,
                                    });
                                }
                            }}
                        >
                            {
                                industry.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Sub-Industry</label>
                        <select 
                            className="form-control select" 
                            id="contentSubIndustry" 
                            name="sub_industry"
                            data-live-search="true"
                            value={selectedContent.sub_industry}
                            onChange={(e) => {
                                var value = e.target.value;
                                this.handleChange({
                                    key: 'sub_industry',
                                    value,
                                });

                                var filterAdv = advertiser.filter((item) => item.subind_id == value);                                    
                                if(filterAdv.length > 0){
                                    this.handleChange({
                                        key: 'advertiser',
                                        value: filterAdv[0].id,
                                    });
                                }
                            }}
                        >
                            {
                                (sub_industry.map((item, index) => {
                                    if(item.ind_id == selectedContent.industry){
                                        return (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        )
                                    }
                                }))
                            }
                        </select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Advertiser</label>
                        <select 
                            className="form-control select" 
                            id="contentAdvertiser" 
                            name="advertiser"
                            data-live-search="true"
                            value={selectedContent.advertiser}
                            onChange={(e) => {
                                this.handleChange({
                                    key: 'advertiser',
                                    value: e.target.value
                                });
                            }}
                        >
                            {
                                (advertiser.map((item, index) => {
                                    if(item.subind_id == selectedContent.sub_industry){
                                        return (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        )
                                    }
                                }))
                            }
                        </select>
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Brand</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={selectedContent.brand || ''} 
                            placeholder="Brand"
                            onChange={(e) => this.handleChange({
                                key: 'brand',
                                value: e.target.value
                            })}
                        />
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Campaign Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={selectedContent.campaign_title || ''} 
                            placeholder="Campaign Title"
                            onChange={(e) => this.handleChange({
                                key: 'campaign_title',
                                value: e.target.value
                            })}
                        />
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Link Video</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={selectedContent.link_video || ''} 
                            placeholder="Link Video"
                            onChange={(e) => this.handleChange({
                                key: 'link_video',
                                value: e.target.value
                            })}
                        />
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em', display: 'grid' }}>
                        <label className="control-label bold text-left">Daytime Image</label>
                        <img src="https://placeimg.com/640/480/any" style={{width: '200px'}} />
                        <input type="file" className="form-control" style={{marginTop: '.3em'}} />
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em', display: 'grid' }}>
                        <label className="control-label bold text-left">Nighttime Image</label>
                        <img src="https://placeimg.com/640/480/any" style={{width: '200px'}} />
                        <input type="file" className="form-control" style={{marginTop: '.3em'}} />
                    </div>
                </div>

            </div>
        );
    }
}

class ContractList extends React.Component {
    constructor(props){
        super(props);
        const { data } = props;
        this.state = {
            company: [],
            id_client: '',
            contract_start: '',
            contract_end: '',
            remarks: '',
            showAlert: false,
            ooh_id: data.ooh_id,
            tableContract: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeContractStart = this.changeContractStart.bind(this);
        this.changeContractEnd = this.changeContractEnd.bind(this);
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value.trim()
        })
    }

    async handleSubmit(e){
        e.preventDefault();
        const{ id_client, contract_start, contract_end, remarks, ooh_id } = this.state;
        if(id_client === "" || contract_start === "" || contract_end === "" || remarks === ""){
            this.setState({
                showAlert: true,
            });
            return;
        }

        let saveContract = await services.postDataContract({
            cmp_id: ooh_id,
            contract_start,
            contract_end,
            contract_desc: remarks
        });

        if(saveContract){
            this.setState({
                showAlert: false,
                contract_start: '',
                contract_end: '',
                remarks: '',
            });

            $('#modalContract').modal('hide');
            swal({
                title: "Success",
                text: "Contract berhasil dibuat",
                type: "success",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Close"
            });
        }
    }

    async getDataContract(){
        let data = await services.getDataContract(this.state.ooh_id);
        // console.log('TABLE CONTRACT', data);
        return data;
    }

    renderTable(){
        $('#dataTableContract').dataTable({
            destroy: true,
            ordering: false,
            columnDefs: [
                { "width": "1%", "targets": 0 },
                // { "width": "5%", "targets": 9 },
            ],
        });
    }

    openModal(){
        $('#modalContract').modal('show');
        $('#client').selectpicker('refresh');
    }

    changeContractStart(){
        let _this = this;
        $('#contract_start').on("changeDate", function (selected) {
            var minDate = new Date(selected.date.valueOf());
            $('#contract_end').datepicker('setStartDate', minDate);
            _this.setState({
                contract_start: moment(minDate).format('MM/DD/YYYY')
            });
        });
    }

    changeContractEnd(){
        let _this = this;
        $('#contract_end').on("changeDate", function (selected) {
            var maxDate = new Date(selected.date.valueOf());
            $('#contract_start').datepicker('setEndDate', maxDate);
            _this.setState({
                contract_end: moment(maxDate).format('MM/DD/YYYY')
            });
        });
    }

    async componentDidMount(){
        let company = await services.getDataClient();
        let contract = await services.getDataContract(this.state.ooh_id);

        this.setState({
            company,
            tableContract: contract,
        });

        $('#contract_start').datepicker({
            orientation: "top auto",
            autoclose: true,
        });

        $('#contract_end').datepicker({
            orientation: "top auto",
            autoclose: true,
        });

        this.changeContractStart(this);
        this.changeContractEnd(this);
    }

    handleCallback(){
        this.props.callBack(this.state);        
    }

    componentDidUpdate(){
        // this.getDataContract();
        // this.renderTable();
    }

    render(){
        const { company, id_client, showAlert, tableContract, contract_start, contract_end, remarks } = this.state;

        return(
            <div className="col-md-12">
                <h3>Contract List</h3>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <button className="btn btn-primary" onClick={() => this.openModal()}>Add Contract</button>
                </div>
                <br />
                <table id="dataTableContract" style={{borderBottom: '1px solid #E5E5E5'}} className="table table-sm table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="text-center" width="1%">No</th>
                            <th className="">Client</th>
                            <th className="">Start Date</th>
                            <th className="">End Date</th>
                            <th className="">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContract.map((item, index) => {
                            return(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.cmp_name}</td>
                                    <td>{item.contract_start}</td>
                                    <td>{item.contract_end}</td>
                                    <td>{item.contract_desc}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className="modal fade" role="dialog" id="modalContract">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-header" style={{borderBottom: '1px solid #ddd !important'}}>
                                <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                                <h3 className="modal-title" id="">Add Contract</h3>
                            </div>
                            <div className="modal-body">
                                { showAlert && (
                                    <div className="alert alert-danger" role="alert">
                                        Harap isi seluruh bidang !
                                        <button type="button" className="close" aria-label="Close" onClick={() => {
                                            this.setState({
                                                showAlert: false
                                            })
                                        }}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                )
                                }
                                    <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div className="col-md-12" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                                            <label className="control-label bold">Client</label>
                                            <select value={id_client} className="form-control select" id="client" name="id_client" data-live-search="true" onChange={this.handleChange}>
                                                {company.map((item, index) => {
                                                    return(
                                                        <option key={index} value={item.value}>{item.text}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                                            <label className="control-label bold">Start Date</label>
                                            {/* <input type="text" className="form-control" defaultValue={'1'} placeholder="Jumlah Titik" /> */}
                                            <div className="input-group">
                                                <input type="text" className="form-control date-picker"
                                                    aria-describedby="basic-addon2"
                                                    placeholder="From contract end" 
                                                    name="contract_start"
                                                    id="contract_start" 
                                                    onChange={this.handleChange}
                                                    autoComplete="off"
                                                    />
                                                <span className="input-group-addon" id="basic-addon2"><span className="menu-icon icon-calendar"></span></span>
                                            </div>
                                        </div>

                                        <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                                            <label className="control-label bold">End Date</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control date-picker"
                                                    aria-describedby="basic-addon2"
                                                    placeholder="To contract end" 
                                                    name="contract_end"
                                                    id="contract_end"
                                                    onChange={this.handleChange}
                                                    autoComplete="off"
                                                    />
                                                <span className="input-group-addon" id="basic-addon2"><span
                                                        className="menu-icon icon-calendar"></span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div className="col-md-12" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                                            <label className="control-label bold">Remarks</label>
                                            <textarea className="form-control" id="remarks" name="remarks" defaultValue={''}
                                            onChange={this.handleChange}
                                            ></textarea>
                                        </div>
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary">Add Contract</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>     
        );
    }
}

class Table extends React.Component {
    constructor(props){
        super(props);
        this.revertRejection = this.revertRejection.bind(this);
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

    revertRejection(item){
        console.log("REVERT REJECT", item);
    }

    renderRow(data = []){
        const { type } = this.props;
        const Link = ReactRouterDOM.Link;
        if(data.length < 1){
            return;
        }

        const rows = data.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{(parseInt(index) + 1)}</td>
                    <td>{item.no_cnv}</td>
                    <td>{item.no_site}</td>
                    <td>{item.district_name}</td>
                    <td>{item.address}</td>
                    <td>{item.otyp_name}</td>
                    <td>{item.panjang + 'x' + item.lebar + 'm'}</td>
                    <td>{item.traffic}</td>
                    <td>{numberToMoney(item.pricelist_12bulan)}</td>
                    {
                        (type === 'Update' && (
                            <td>{moment(new Date(item.updated_at)).format('DD MMM YYYY HH:mm:ss') }</td>
                        ))
                    }
                    <td>
                        <Link 
                            to={{
                                pathname: `/request/${this.props.type}/${item.ooh_id}`,
                            }}
                        >
                                {
                                    (type === 'Reject' && (
                                        <button className='btn'>
                                            <span className="menu-icon icon-eye" title="View"></span>
                                        </button>
                                    ))
                                }
                                {
                                    (type !== 'Reject' && (
                                        <button className='btn btn-primary'>
                                            <span className="menu-icon icon-pencil" title="Edit"></span>
                                        </button>
                                    ))
                                }
                        </Link>
                        {
                            (type === 'Reject' && (
                                <button 
                                    className='btn btn-primary' 
                                    style={{marginLeft: '.5em', marginRight: '.5em'}}
                                    onClick={() => {
                                        let _this = this;
                                        swal({
                                            title: "Would you like to Revert this rejection?",
                                            html: "The Canvassing Data will return to their original list.",
                                            type: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Yes",
                                            confirmButtonColor: "#ec6c62"
                                        }).then(function(isConfirm) {
                                            if (isConfirm.value) {
                                                _this.revertRejection(item);
                                            }
                                        });
                                    }}
                                >
                                    <span className="menu-icon icon-arrow-left" title="Revert"></span>
                                </button>
                            ))
                        }
                    </td>
                </tr>
            )
        });

        return rows;
    }

    render(){
        const { data, type } = this.props;
        const rows = this.renderRow(data);

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
                                        {
                                            (type === 'Update' && (
                                                <th className="">Last Update</th>
                                            ))
                                        }
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
        this.handleClick = this.handleClick.bind(this);
    }

    async getDataTable(tab){
        let data = [];
        let result = await services.getDataRequestValidation(tab);
        
        $.each(result.data, function(index, value){
            data.push(value);
        });

        return data;
    }

    async componentDidMount(){
        this.setState({
            tab: this.state.tab,
            header: this.state.header,
            dataTable: await this.getDataTable(this.state.tab),
        });
    }

    async handleClick(tab){
        let dataTable = await this.getDataTable(tab);
        this.setState({
            tab,
            header: this.state.header,
            dataTable
        });
    }

    render(){
        const { tab, dataTable } = this.state;
        return (
            <div>
                <h1>{this.state.header.title}</h1>
                <div className="form-horizontal">
                    <div className="panel panel-default tabs">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="active"><a onClick={() => this.handleClick('Add')} href="#tab-add" role="tab" data-toggle="tab">Add</a></li>
                            <li><a onClick={() => this.handleClick('Update')} href="#tab-updated" role="tab" data-toggle="tab">Update</a></li>
                            <li><a onClick={() => this.handleClick('Reject')} href="#tab-rejected" role="tab" data-toggle="tab">Reject</a></li>
                        </ul>
                        <div className="panel-body tab-content">
                            {
                                <Table data={dataTable} type={tab} {...this.props}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Environment = ({ prevStep, handleChange, values }) => {
    const { useState, useEffect } = React;
    const [env, setEnv] = useState([]);

    useEffect(async () => {
        let dataEnv = await services.getDataEnvironment();
        setEnv(dataEnv);
        $('.select').selectpicker('refresh');
        return () => {
            setEnv([]);
        }
      }, [setEnv]);

    // useEffect(() => {
    //     $('.select').selectpicker('refresh');
    //     return [];
    // }, []);
    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-10">
                <h3>Environment</h3>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 1</label>
                        <select className="form-control select" data-live-search="true" name="lingkungan1" value={values.lingkungan1} onChange={(e) => {
                            handleChange({
                                type: 'lingkungan1',
                                value: e.target.value
                            });
                        }}>
                        {env.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.text}</option>
                            );
                        })}
                        </select>
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 2</label>
                        <select className="form-control select" data-live-search="true" name="lingkungan2" value={values.lingkungan2} onChange={(e) => {
                            handleChange({
                                type: 'lingkungan2',
                                value: e.target.value
                            });
                        }}>
                        {env.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.text}</option>
                            );
                        })}
                        </select>
                    </div>
                </div>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 3</label>
                        <select className="form-control select" data-live-search="true" name="lingkungan3" value={values.lingkungan3} onChange={(e) => {
                            handleChange({
                                type: 'lingkungan3',
                                value: e.target.value
                            });
                        }}>
                        {env.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.text}</option>
                            );
                        })}
                        </select>
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 4</label>
                        <select className="form-control select" data-live-search="true" name="lingkungan4" value={values.lingkungan4} onChange={(e) => {
                            handleChange({
                                type: 'lingkungan4',
                                value: e.target.value
                            });
                        }}>
                        {env.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.text}</option>
                            );
                        })}
                        </select>
                    </div>
                </div>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 5</label>
                        <select className="form-control select" data-live-search="true" name="lingkungan5" value={values.lingkungan5} onChange={(e) => {
                            handleChange({
                                type: 'lingkungan5',
                                value: e.target.value
                            });
                        }}>
                        {env.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.text}</option>
                            );
                        })}
                        </select>
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 6</label>
                        <select className="form-control select" data-live-search="true" name="lingkungan6" value={values.lingkungan6} onChange={(e) => {
                            handleChange({
                                type: 'lingkungan6',
                                value: e.target.value
                            });
                        }}>
                        {env.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.text}</option>
                            );
                        })}
                        </select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 7</label>
                        <select className="form-control select" data-live-search="true" name="lingkungan7" value={values.lingkungan7} onChange={(e) => {
                            handleChange({
                                type: 'lingkungan7',
                                value: e.target.value
                            });
                        }}>
                        {env.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.text}</option>
                            );
                        })}
                        </select>
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lingkungan 8</label>
                        <select className="form-control select" data-live-search="true" name="lingkungan8" value={values.lingkungan8} onChange={(e) => {
                            handleChange({
                                type: 'lingkungan8',
                                value: e.target.value
                            });
                        }}>
                        {env.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.text}</option>
                            );
                        })}
                        </select>
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
    const { useEffect } = React;

    const getTrafficData = async () => {
        let traffic = await services.getTrafficData(values.latitude, values.longitude);
        if(traffic.length > 0){
            handleChange({
                type: 'traffic',
                value: traffic[0][1]
            })
        }
    }

    useEffect(() => {
        $('.select').selectpicker('refresh');
        return [];
    }, []);

    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-10">
                <h3>Spesification</h3>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Jumlah Sisi</label>
                        <select className="form-control select" id="jumlah_sisi" name="jumlah_sisi" value={values.jumlah_sisi} onChange={(e) => {
                            handleChange({
                                type: 'jumlah_sisi',
                                value: e.target.value
                            });
                        }}>
                            <option value="1">1 Sisi</option>
                            <option value="2">2 Sisi</option>
                            <option value="3">3 Sisi</option>
                            <option value="4">4 Sisi</option>
                            <option value="5">5 Sisi</option>
                            <option value="6">6+ Sisi</option>
                        </select>
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Jumlah Titik</label>
                        <input type="text" className="form-control" placeholder="Jumlah Titik" value={values.jumlah_set} onChange={(e) => {
                            handleChange({
                                type: 'jumlah_set',
                                value: e.target.value
                            });
                        }} />
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <div className="col-md-6" style={{paddingLeft: '0'}}>
                            <label className="control-label bold">Panjang</label>
                            <input type="text" className="form-control" placeholder="Panjang" value={values.panjang} onChange={(e) => {
                                handleChange({
                                    type: 'panjang',
                                    value: e.target.value
                                });
                            }} />
                        </div>
                        <div className="col-md-6">
                            <label className="control-label bold">Lebar</label>
                            <input type="text" className="form-control" placeholder="Lebar" value={values.lebar} onChange={(e) => {
                                handleChange({
                                    type: 'lebar',
                                    value: e.target.value
                                });
                            }} />
                        </div>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Orientasi</label>
                        <select className="form-control select" id="orientasi" name="orientasi" value={values.orientasi} onChange={(e) => {
                            handleChange({
                                type: 'orientasi',
                                value: e.target.value
                            });
                        }}>
                            <option value="1">Vertical</option>
                            <option value="2">Horizontal</option>
                        </select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Lighting</label>
                        <select className="form-control select" id="lighting" name="lighting" value={values.lighting} onChange={(e) => {
                            handleChange({
                                type: 'lighting',
                                value: e.target.value
                            });
                        }}>
                            <option value="1">Frontlite</option>
                            <option value="2">Backlite</option>
                        </select>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <div className="col-md-6" style={{paddingLeft: '0'}}>
                            <label className="control-label bold">Traffic</label>
                            <input type="text" className="form-control" placeholder="Traffic" value={values.traffic} onChange={(e) => {
                                handleChange({
                                    type: 'traffic',
                                    value: e.target.value
                                });
                            }} />
                        </div>
                        <div className="col-md-6" style={{marginTop: '25px'}}>
                            <button onClick={() => {
                                getTrafficData()
                            }} className="btn btn-primary">Get Traffic Data</button>
                        </div>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Score</label>
                        <input type="text" className="form-control" placeholder="Score" value={values.vscore} onChange={(e) => {
                            handleChange({
                                type: 'vscore',
                                value: e.target.value
                            });
                        }} />
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Fixing</label>
                        <select className="form-control select" id="fixing" name="fixing" value={values.fixing} onChange={(e) => {
                            handleChange({
                                type: 'fixing',
                                value: e.target.value
                            });
                        }}>
                            <option value="Uni-Pole">Uni-Pole</option>
                            <option value="Duo-Pole">Duo-Pole</option>
                            <option value="Three-Pole">Three-Pole</option>
                            <option value="Wall Mounted">Wall Mounted</option>
                            <option value="Free Standing">Free Standing</option>
                            <option value="Hanging">Hanging</option>
                        </select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Competition</label>
                        <select className="form-control select" id="competition" name="competition" value={values.fixing} onChange={(e) => {
                            handleChange({
                                type: 'fixing',
                                value: e.target.value
                            });
                        }}>
                            <option value="None">None</option>
                            <option value="1 Site">1 Site</option>
                            <option value="2 Sites">2 Sites</option>
                            <option value="3 Sites">3 Sites</option>
                            <option value="4 Sites">4 Sites</option>
                            <option value="5 Sites">5 Sites</option>
                            <option value="6+ Sites">6+ Sites</option>
                        </select>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Visible Distance</label>
                        <select className="form-control select" id="visible_distance" name="visible_distance" value={values.visible_distance} onChange={(e) => {
                            handleChange({
                                type: 'visible_distance',
                                value: e.target.value
                            });
                        }}>
                            <option value="0-25m">0-25m</option>
                            <option value="25-50m">25-50m</option>
                            <option value="50-100m">50-100m</option>
                            <option value="100-200m">100-200m</option>
                            <option value="200m+">200m+</option>
                        </select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Angle of Vision</label>
                        <select className="form-control select" id="angle_of_vision" name="angle_of_vision" value={values.angle_of_vision} onChange={(e) => {
                            handleChange({
                                type: 'angle_of_vision',
                                value: e.target.value
                            });
                        }}>
                            <option value="Head On">Head On</option>
                            <option value="Nearside - Angled Toward">Nearside - Angled Toward</option>
                            <option value="Offside - Angled Toward">Offside - Angled Toward</option>
                            <option value="Nearside - Angled Away">Nearside - Angled Away</option>
                            <option value="Offside - Angled Away">Offside - Angled Away</option>
                            <option value="Nearside - Parallel to the Road">Nearside - Parallel to the Road</option>
                            <option value="Offside - Parallel to the Road">Offside - Parallel to the Road</option>
                        </select>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Obstruction</label>
                        <select className="form-control select" id="obstruction" name="obstruction" value={values.obstruction} onChange={(e) => {
                            handleChange({
                                type: 'obstruction',
                                value: e.target.value
                            });
                        }}>
                            <option value="None">None (0%)</option>
                            <option value="Slight">Slight (0-20%)</option>
                            <option value="Moderate">Moderate (20-50%)</option>
                            <option value="Severe">Severe ({'>'}50%)</option>
                        </select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Street Lite</label>
                        <select className="form-control select" id="street_lite" name="street_lite" value={values.street_lite} onChange={(e) => {
                            handleChange({
                                type: 'street_lite',
                                value: e.target.value
                            });
                        }}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Road Type</label>
                        <select className="form-control select" id="road_type" name="road_type" value={values.road_type} onChange={(e) => {
                            handleChange({
                                type: 'road_type',
                                value: e.target.value
                            });
                        }}>
                            <option value="Single Carriage">Single Carriage</option>
                            <option value="Dual Carriages">Dual Carriages</option>
                            <option value="3+ Carriages">3+ Carriages</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">OOH Flag</label>
                        <div style={{ display: 'grid' }}>
                            <label className="check">
                                <input type="radio" className="iradio" checked={values.ooh_flag == '1'} onChange={(e) => {
                                    handleChange({
                                        type: 'ooh_flag',
                                        value: e.target.value
                                    });
                                }} value="1" id="ooh_flag" name="ooh_flag" /> 
                                Active
                            </label>
                            <label className="check">
                                <input type="radio" className="iradio" checked={values.ooh_flag == '0'} onChange={(e) => {
                                    handleChange({
                                        type: 'ooh_flag',
                                        value: e.target.value
                                    });
                                }} value="0" id="ooh_flag" name="ooh_flag" />
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
    const { useEffect, useState } = React;
    // console.log('VALUES LOC', values);

    const [dataLocation, setDataLocation] = useState({
        dataProv: [],
        dataDistrict: [],
        dataSubDistrict: [],
    });

    const [province, setProvince] = useState(values.province);
    const [district, setDistrict] = useState(values.district);

    useEffect(async () => {
      let dataProv = await services.filterArea();
      let dataDistrict = await services.filterArea({province: values.province});
      let dataSubDistrict = await services.filterArea({province: values.province, district: values.district});

      setDataLocation({
        dataProv,
        dataDistrict,
        dataSubDistrict
      });

      return () => {
          setDataLocation({
            dataProv: [],
            dataDistrict: [],
            dataSubDistrict: [],
        });
      }
    }, [setDataLocation, province, district]);

    const initMap = () => {
        let map;
        map = new google.maps.Map(document.getElementById("map"), {
            center: { 
                lat: values.latitude || -6.200000, 
                lng: values.longitude || 106.816666,
            },
            zoom: 15,
        });

        const marker = new google.maps.Marker({
            position: { 
                lat: values.latitude || -6.200000, 
                lng: values.longitude || 106.816666,
            },
            draggable:true,
            map: map,
          });  
        console.log('INITIALIZE MAP', map);

        google.maps.event.addListener(marker, 'dragend', (marker) => {
            let latLng = marker.latLng; 
            handleChange({
                type: 'longitude',
                value: latLng.lng(),
            });

            handleChange({
                type: 'latitude',
                value: latLng.lat(),
            });
        });
    }

    const openModal = () => {
        $('#modalMaps').modal({
            show: true,
        });
        initMap();
    }

    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-10">
                <h3>Location</h3>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Province</label>
                        <select className="form-control select" name="province" value={province} onChange={(e) => {
                            handleChange({
                                type: 'province',
                                value: e.target.value
                            });
                            setProvince(e.target.value);
                            }}>
                            {dataLocation.dataProv.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>{item.value}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">District</label>
                        <select className="form-control select" name="district_" value={district} onChange={(e) => {
                            handleChange({
                                type: 'district',
                                value: e.target.value
                            });
                            setDistrict(e.target.value);
                            }}>
                            {dataLocation.dataDistrict.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>{item.value}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">City / State</label>
                        <select className="form-control select" name="city" value={values.sub_district} onChange={(e) => {
                            handleChange({
                                type: 'sub_district',
                                value: e.target.value
                            });
                            }}>
                            {dataLocation.dataSubDistrict.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>{item.value}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Address</label>
                        <input type="text" className="form-control" onChange={(e) => {
                            handleChange({
                                type: 'address',
                                value: e.target.value
                            });
                        }} value={values.address} placeholder="Address" />
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <div className="col-md-5" style={{paddingLeft: '0'}}>
                            <label className="control-label bold">Latitude</label>
                            <input type="text" className="form-control" onChange={(e) => {
                                handleChange({
                                type: 'latitude',
                                value: e.target.value
                            });
                            }} value={values.latitude || '-6.200000'} placeholder="Latitude" />
                        </div>
                        <div className="col-md-5">
                            <label className="control-label bold">Longitude</label>
                            <input type="text" className="form-control" onChange={(e) => {
                                handleChange({
                                type: 'longitude',
                                value: e.target.value
                            });
                            }} value={values.longitude || '106.816666'} placeholder="Longitude" />
                        </div>
                        <div className="col-md-2" style={{marginTop: '25px'}}>
                            <label className="control-label bold">&nbsp;</label>
                            <button className="btn btn-primary" onClick={() => {
                                openModal();
                            }}>
                                <span className="menu-icon icon-map"></span>
                            </button>
                        </div>
                    </div>
                    
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">View</label>
                        <input type="text" className="form-control" onChange={(e) => {
                            handleChange({
                                type: 'view',
                                value: e.target.value
                            });
                        }}
                            defaultValue={values.view} placeholder="View" />
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

            <div className="modal fade" role="dialog" id="modalMaps">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{borderBottom: '1px solid #ddd !important'}}>
                            <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                            <h3 className="modal-title" id="">View Map</h3>
                        </div>
                        <div className="modal-body">
                            <div id="map" style={{
                                height: '500px',
                            }}></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const GeneralInfo = ({nextStep, handleChange, values}) => {
    const { useEffect, useState } = React;
    const [kodeProduk, setKodeProduk] = useState([]);
    const [tipeProduk, setTipeProduk] = useState([]);

    useEffect(async () => {
        setKodeProduk(await services.kodeProduk());
        setTipeProduk(await services.selboxCustom('ooh_type'));
        $('.select').selectpicker('refresh');

        return () => {
            setKodeProduk([]);
            setTipeProduk([]);
        }
    }, [setKodeProduk, setTipeProduk]);

    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-10">
                <h3>General Info</h3>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">OOH ID</label>
                        <input type="text" className="form-control" readOnly defaultValue={values.ooh_id} placeholder="OOH ID" />
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Canvasing ID</label>
                        <input type="text" className="form-control" readOnly defaultValue={values.no_cnv} placeholder="Canvasing ID" name="no_cnv_disabled" />
                    </div>
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">PRISMA ID</label>
                        <input type="text" className="form-control" readOnly defaultValue={values.no_site} placeholder="PRISMA ID" id="no_site" name="no_site" />
                    </div>
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Owner</label>
                        <select className="form-control select" id="ownerOOH" name="ownerOOH" onChange={(e) => {
                            handleChange({
                                type: 'owner',
                                value: e.target.value
                            })
                        }} value={values.owner}>
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
                            onChange={(e) => {
                                handleChange({
                                    type: 'kode_produk',
                                    value: e.target.value
                                });
                            }}
                            value={values.kode_produk}
                        >
                            {kodeProduk.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>{item.value}</option>
                                );
                            })}
                        </select>
                    </div>
                    
                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">Tipe Produk</label>
                        <select 
                            className="form-control select" 
                            id="type_produk" 
                            name="type_produk"
                            onChange={(e) => handleChange({
                                type: 'tipe_produk',
                                value: e.target.value
                            })}
                            value={values.type_produk}
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
                        <select className="form-control select" id="ooh_type" name="ooh_type"
                        onChange={(e) => handleChange({
                            type: 'ooh_type',
                            value: e.target.value
                        })}
                        value={values.ooh_type}>
                            {tipeProduk.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>{item.value}</option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <label className="control-label bold">OOH Status</label>
                        <div style={{ display: 'grid' }}>
                            <label className="check">
                                <input type="radio" className="iradio" checked={values.ooh_status == '1'} value="1" name="ooh_status"  onChange={(e) => {
                                    handleChange({
                                        type: 'ooh_status',
                                        value: e.target.value
                                    })
                                }}/> 
                                Available
                            </label>
                            <label className="check">
                                <input type="radio" className="iradio" checked={values.ooh_status == '2'} value="2" name="ooh_status" onChange={(e) => {
                                    handleChange({
                                        type: 'ooh_status',
                                        value: e.target.value
                                    })
                                }} />
                                Tersewa
                            </label>
                            <label className="check">
                                <input type="radio" className="iradio" checked={values.ooh_status == '3'} value="3" name="ooh_status" onChange={(e) => {
                                    handleChange({
                                        type: 'ooh_status',
                                        value: e.target.value
                                    })
                                }} />
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
        // console.log("PROPS", props);
        const { data } = props;

        this.state = {
            step: 1,
            ooh_id: data.ooh_id || '',
            kode_produk: data.kode_produk || '',
            owner: data.owner || '',
            no_site: data.no_site || '',
            ooh_type: data.ooh_type || '',
            no_cnv: data.no_cnv || '',
            ooh_status: data.ooh_status || '',
            type_produk: data.type_produk || '',
            province: data.province || '',
            district: data.district || '',
            sub_district: data.sub_district || '',
            address: data.address || '',
            latitude: data.latitude || '',
            longitude: data.longitude || '',
            view: data.view || '',
            jumlah_sisi: data.jumlah_sisi || '',
            jumlah_set: data.jumlah_set || '',
            panjang: data.panjang || '',
            lebar: data.lebar || '',
            orientasi: data.orientasi || '',
            lighting: data.lighting || '',
            traffic: data.traffic || '',
            vscore: data.vscore || '',
            fixing: data.fixing || '',
            competition: data.competition || '',
            visible_distance: data.visible_distance || '',
            angle_of_vision: data.angle_of_vision || '',
            obstruction: data.obstruction || '',
            street_lite: data.street_lite || '',
            road_type: data.road_type || '',
            ooh_flag: data.ooh_flag || '',
            lingkungan1: data.lingkungan1 || '', 
            lingkungan2: data.lingkungan2 || '', 
            lingkungan3: data.lingkungan3 || '', 
            lingkungan4: data.lingkungan4 || '', 
            lingkungan5: data.lingkungan5 || '',
            lingkungan6: data.lingkungan6 || '', 
            lingkungan7: data.lingkungan7 || '', 
            lingkungan8: data.lingkungan8 || ''
        }

        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        let type = e.type;
        let value = e.value;
        // console.log('HANDLE', {type, value});
        this.setState({
            [type]:value
        }, () => {
            this.handleCallback();
        });
    }

    prevStep() {
        const { step } = this.state;
        this.setState({
            step: (step - 1)
        });
    }

    handleCallback(){
        this.props.callBack(this.state);
    }

    nextStep() {
        const { step } = this.state;
        this.setState({
            step: (step + 1)
        });
    }

    render(){
        const values = this.state;

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
        super(props);
        this.state = {
            dataOOH: {},
            info: {},
            content: [],
            score: {},
        }

        this.handleApprove = this.handleApprove.bind(this);
    }

    async componentDidMount(){
        const { ooh_id, type } = this.props.match.params;
        let data = await services.getDataOOHID(ooh_id, type);
        let score = await services.getDataVasContent(ooh_id);
        // let data = await services.getTempOOHId(ooh_id, type);
        // console.log('DATA REQUEST', data);

        var { 
            no_cnv, kode_produk, no_site, 
            view, address, owner, ooh_type, district, 
            sub_district, ooh_status, province, type_produk,
            latitude, longitude, jumlah_sisi, jumlah_set,
            panjang, lebar, orientasi, lighting,
            traffic, vscore, fixing, competition, visible_distance,
            angle_of_vision, obstruction, street_lite, road_type, ooh_flag,
            lingkungan1, lingkungan2, lingkungan3, lingkungan4, lingkungan5,
            lingkungan6, lingkungan7, lingkungan8
        } = data;

        this.setState({
            dataOOH: data,
            score: score,
            content: data.conthis,
            info: { 
                no_cnv, kode_produk, no_site, 
                view, address, owner, ooh_type, district, 
                sub_district, ooh_status, province, type_produk,
                latitude, longitude, jumlah_sisi, jumlah_set,
                panjang, lebar, orientasi, lighting,
                traffic, vscore, fixing, competition, visible_distance,
                angle_of_vision, obstruction, street_lite, road_type, ooh_flag,
                lingkungan1, lingkungan2, lingkungan3, lingkungan4, lingkungan5,
                lingkungan6, lingkungan7, lingkungan8
            },
        }, () => {
            console.log(this.state)
        });
    }

    handleApprove(){
        const { info, content, score } = this.state;
        console.log('HANDLE APPROVE', {info, content, score});
    }

    render(){
        const Link = ReactRouterDOM.Link;

        const { 
            no_cnv, ooh_id, no_site, view, kode_produk, address, 
            owner, district, ooh_type, province, sub_district, 
            ooh_status, type_produk, latitude, longitude, 
            jumlah_sisi, jumlah_set, panjang, lebar, orientasi, 
            lighting, traffic, vscore, fixing, competition, visible_distance,
            angle_of_vision, obstruction, street_lite, road_type, ooh_flag,
            lingkungan1, lingkungan2, lingkungan3, lingkungan4, lingkungan5,
            lingkungan6, lingkungan7, lingkungan8, conthis
        } = this.state.dataOOH;

        var dataInfo = { 
            no_cnv, ooh_id, kode_produk, no_site, 
            view, address, owner, ooh_type, district, 
            sub_district, ooh_status, province, type_produk,
            latitude, longitude, jumlah_sisi, jumlah_set,
            panjang, lebar, orientasi, lighting,
            traffic, vscore, fixing, competition, visible_distance,
            angle_of_vision, obstruction, street_lite, road_type, ooh_flag,
            lingkungan1, lingkungan2, lingkungan3, lingkungan4, lingkungan5,
            lingkungan6, lingkungan7, lingkungan8
        };

        var dataContractList = {
            ooh_id,
        }

        var dataScore = {
            ooh_id,
        }

        var dataContent = {
            ooh_id, conthis
        }

        return(
            <div style={{marginBottom: '10em'}}>
                <h1>Request Validation: { this.props.match.params.type }</h1>
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
                                {typeof dataInfo.ooh_id !== 'undefined' && (
                                    <Info 
                                        data={dataInfo} 
                                        callBack={(value) => {
                                            this.setState({
                                                info: value,
                                            });
                                        }}
                                    />
                                )}
                            </div>

                            <div className="tab-pane" id="tab-contract">
                                {typeof dataContractList.ooh_id !== 'undefined' && (
                                    <ContractList 
                                        data={dataContractList}
                                        callBack={(value) => {
                                        }}
                                    />
                                )}
                            </div>
                            <div className="tab-pane" id="tab-content">
                                {typeof dataScore.ooh_id !== 'undefined' && (
                                    <Content 
                                        data={dataContent} 
                                        callBack={(value) => {
                                            this.setState({
                                                content: value,
                                            });
                                        }} 
                                    />
                                )}
                            </div>
                            <div className="tab-pane" id="tab-score">
                                {typeof dataScore.ooh_id !== 'undefined' && (
                                    <Score 
                                        data={dataScore} 
                                        callBack={(value) => {
                                            let temp = {};
                                            value.forEach((item) => temp[item.name] = item.value);
                                            this.setState({
                                                score: temp,
                                            });
                                        }} 
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'end'}}>
                        <Link to="/" className='btn btn-outline-primary' style={{ marginLeft: '.5em', marginRight: '.5em' }}>Back</Link>
                        <button className='btn btn-danger' style={{ marginLeft: '.5em', marginRight: '.5em' }}>Reject</button>
                        <button onClick={() => {
                            this.handleApprove();
                        }} className='btn btn-primary' style={{ marginLeft: '.5em', marginRight: '.5em' }}>Approve</button>
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
                <Route path="/request/:type/:ooh_id" component={Request} />
            </ReactRouterDOM.HashRouter>
        )
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<App />, domContainer);