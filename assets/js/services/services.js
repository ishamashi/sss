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
}

export default new Services;