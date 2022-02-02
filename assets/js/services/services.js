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
}

export default new Services;