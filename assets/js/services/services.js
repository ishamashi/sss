class Services {
    constructor(){
        this.axiosInstance = axios.create({
            baseURL: APIURL,
            headers: {
                'token': 'Bearer ' + token,
                'Ip-Addr': IP,
            }
          });
    }

    async getDataRequestValidation(type){
        let result = await this.axiosInstance.get('/data/oohlib', {
            params: {
                flag: type,
                validating: true
            }
        })
        .then(({data}) => {
            return data;
        })
        .catch((err) => err);

        return result;
    }

    async getDataOOHID(ooh_id){
        let result = this.axiosInstance.get('/data/oohlib', {
            params: {
                ooh_id
            }
        })
        .then(({data}) => {
            var temp = [];
            $.each(data.data, (index, data) => {
                temp.push(data);
            });
            return temp[0];
        })
        .catch((err) => err);
        return result;
    }

    async getTempOOHId(ooh_id, type){
        let reqData = await this.getDataRequestValidation(type);
        let filter = {};
        if(reqData.data.length > 0){
            reqData.data.forEach((item) => {
                if(parseInt(item.ooh_id) === parseInt(ooh_id)){
                    filter = item;
                }
            });
        }

        return filter;
    }

    async filterArea(params = {}){
        let result = this.axiosInstance.get('/data/filterarea', {
            params: params
        }).then(({data}) => data)
        .then((response) => {
            var temp = [];
            var data = response.data;
            if (typeof response.data != 'object') { data = $.parseJSON(response.data); }

            $.each(data, function (key, value) {
                temp.push({
                    id: value[0],
                    value: value[1]
                });
            });

            return temp;
        })
        .catch((err) => {
            console.log(err);
        });

        return result;
    }

    async kodeProduk(kode_produk = ''){
        let result = this.axiosInstance.get('/data/kodeproduk', {
            params: {
                kode_produk
            }
        })
        .then(({data}) => {
            var temp = [];
            $.each(data.data, (index, value) => {
                temp.push({
                    id: value[0],
                    value: value[0]
                });
            });
            return temp;
        })
        .catch((err) => err);
        return result;
    }

    async selboxCustom(params = ''){
        let result = this.axiosInstance.get('/data/selboxcustom')
        .then(({data}) => data.data)
        .then((data) => {
            var temp = [];
            if(params == 'ooh_type'){
                $.each(data.ooh_type, (index, value) => {
                    temp.push({
                        id: value[0],
                        value: value[1]
                    });
                });
            }else if(params == 'crowd_category'){
                $.each(data.crowd_category, (index, value) => {
                    temp.push({
                    id: value[0],
                    value: value[1]
                    });
                });
            }else if(params == 'road_category'){
                $.each(data.road_category, (index, value) => {
                    temp.push({
                    id: value[0],
                    value: value[1]
                    });
                });
            }

            return temp;
        })
        .catch((err) => err);
        return result;
    }

    async getTrafficData(lat, lng){
        let result = this.axiosInstance.get('/data/gettraffic', {
            params: {
                latitude: lat,
                longitude: lng
            }
        })
        .then(({data}) => data.data)
        .then((response) => {
            return response;
        })
        .catch((err) => err);
        return result;
    }

    async getDataContract(ooh_id){
        let result = this.axiosInstance.get('/data/contract', {
            params: {
                ooh_id
            }
        })
        .then(({data}) => data.data)
        .then((response) => {
            let temp = [];
            if(response.length > 0){
                $.each(response, function (k, v) {
                    temp.push({
                        "contract_id": v[0],
                        "cmp_id": v[1],
                        "cmp_name": v[2],
                        "contract_start": v[3],
                        "contract_end": v[4],
                        "contract_desc": v[5],
                        "ooh_id": v[6],
                        "no_site": v[7],
                    });
                })
            }
            return temp;
        })
        .catch((err) => err);
        return result;
    }

    async postDataContract(data){
        let result = this.axiosInstance.post('/data/contract', data)
        .then(({data}) => {
            if(data.processMessage === 'Success'){
                return true;
            }
            return false;
        })
        .catch((err) => err);
        return result;
    }

    async getDataClient(){
        let result = this.axiosInstance.get('/user/company')
        .then(({data}) => data.data)
        .then((response) => {
            let temp = [];
            $.each(response, (index, value) => {
                temp.push({
                    value: value[0],
                    text: value[1]
                });
            });
            return temp;
        })
        .catch((err) => err);
        return result;
    }

    async getDataVasContent(ooh_id){
        let result = this.axiosInstance.get('/data/vascontent', {
            params: {
                ooh_id
            }
        })
        .then(({data}) => data.data)
        .then((response) => {
            return response;
            // let temp = [];
            // if(response.length > 0){
            //     $.each(response, function (k, v) {
            //         temp.push({
            //             "contract_id": v[0],
            //             "cmp_id": v[1],
            //             "cmp_name": v[2],
            //             "contract_start": v[3],
            //             "contract_end": v[4],
            //             "contract_desc": v[5],
            //             "ooh_id": v[6],
            //             "no_site": v[7],
            //         });
            //     })
            // }
            // return temp;
        })
        .catch((err) => err);
        return result;
    }

}

export default new Services;