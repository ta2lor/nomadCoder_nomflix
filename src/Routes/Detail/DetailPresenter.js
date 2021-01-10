import React from "react";
import PropTypes from "prop-types";
import styled  from "styled-components";
import Loader from "Components/Loader";

import Helmet from "react-helmet";
import Message from "Components/Message";

const Container = styled.div`
    height : calc(100vh - 50px);
    width: 100%;
    position : relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-image: url(${props => props.bgImage});
    background-size : cover;
    background-position: center center;
    filter : blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1;
    position: relative;
`;

const Cover = styled.div`
    width : 30%;
    background-image: url(${props => props.bgImage});
    background-size : cover;
    background-position: center center;
    height: 100%;
    border-radius: 5px;
`;


const Data = styled.div`
    width:70%;
    margin-left: 10px;
`;

const Title= styled.h3`
    font-size : 15px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span`

`;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size : 12px;
    opacity: 0.7;
    line-height:1.5;
    width: 50%;
`;

const HttpLink = styled.a`

`;

const Video = styled.span`
    width: 1000px;
    height: 300px;
    
`;



const Source = styled.object`
    width: 350px;
    height: 300px;
`;

const DetailPresenter = ({result, loading, error}) => 
    loading ? (
        <>
            <Helmet><title>Loading | nomflix</title></Helmet>
        
        <Loader /> 
        </>
    ):(
        error ? <Message /> :         <Container>
        <Helmet><title>{result.original_title ? result.original_title : result.original_name} | nomflix</title></Helmet>
    
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
        <Content>
            <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../assets/noPoster.png")} />
            <Data>
                <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                <ItemContainer>
                    <Item>{result.release_date ? result.release_date.substring(0,4) : result.first_air_date.substring(0,4)}</Item>
                    <Divider>·</Divider>
                    <Item>{result.release_date ? result.runtime : result.episode_run_time[0]}</Item> minutes
                    <Divider>·</Divider>
                    <Item>{result.genres && result.genres.map((genre, index) => index === result.genres.length-1 ? genre.name : ` ${genre.name} /`)}</Item>
                    <Divider>·</Divider>
                    <HttpLink href={result.imdb_id ? `https://www.imdb.com/title/${result.imdb_id}` : "https://www.imdb.com"}>Go IMDB</HttpLink>
                </ItemContainer>
                <Overview>
                    {result.overview}
                </Overview>
                <Video>{result.videos.results.map(video =>
                        <Source data={`https://www.youtube.com/embed/${video.key}`} />
                    )}
                </Video>
            </Data>
        </Content>
    </Container>

    );
        
        

DetailPresenter.propTypes ={
    result: PropTypes.object, 
    loading: PropTypes.bool.isRequired, 
    error: PropTypes.string
}

export default DetailPresenter;