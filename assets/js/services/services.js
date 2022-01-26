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

    async test(){
        let result = await this.axiosInstance.get('/data/version').then(({data}) => data);
        return result;
    }
}

export default new Services;