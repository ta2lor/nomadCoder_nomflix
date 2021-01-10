import { moviesApi } from "api";
import React from "react";
import HomePresenter from "./HomePresenter";



export default class extends React.Component{
    state ={
        nowPlaying: null,
        upcoming : null,
        popular : null,
        error: null,
        loading : true,
    };

    async componentDidMount(){
        try{
            const {data: {results: nowPlaying}} = await moviesApi.nowPlaying();
            const {data: {results: upcoming}} = await moviesApi.upcoming();
            const {data: {results: popular}} = await moviesApi.popular();

            this.setState({
                nowPlaying,
                popular,
                upcoming,
            })
        }catch{
            this.setState({
                error: "Can's get movies or and information about that sorry!~"
            })
        }finally{
            this.setState({
                loading : false 
            })
        }
    }

    render(){
        const{ nowPlaying, upcoming, popular,error,loading} = this.state;
        console.log(this.state)
        return(
            <HomePresenter 
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error ={error}
                loading={loading}

            />
        )
    }
}