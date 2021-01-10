import { moviesApi, tvApi } from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component{
    state={
        movieResult : null,
        tvResult : null,
        searchTerm: "",
        error : null,
        loading: false,
    };

    handleSubmit = event => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if(searchTerm !== ""){
            this.serachByTerm();
        }
    };

    updateTerm = event =>{
        const {target : {value}} = event;
        this.setState({
            searchTerm : value
        })
    }
    serachByTerm =async ()=>{
        const{searchTerm} = this.state
        
        this.setState({loading: true})
        try{
            const {data : {results : movieResult}} = await moviesApi.search(searchTerm);
            const {data: {results: tvResult}} = await tvApi.search(searchTerm);

            this.setState({movieResult, tvResult})
        }catch{
            this.setState({error:"cannot fine word"})
        }finally{
            this.setState({loading:false});
        }
    }

    render(){
        const {movieResult, tvResult, searchTerm, error,loading} = this.state
        console.log(this.state)
        return(
            <SearchPresenter 
                movieResult={movieResult}
                tvResult={tvResult}
                error={error}
                loading={loading}
                searchTerm={searchTerm}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        ) 
    }
        
    
}