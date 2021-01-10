import React from "react";
import PropTypes from "prop-types";
import styled  from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Helmet from "react-helmet";


const Container = styled.div`
    padding: 0px 20px;
`;

const Form = styled.form`
    margin-bottom: 50px;
    width: 100%;
`;

const Input = styled.input`
    all: unset;
    font-size:28px;
    width : 100%;
`;

const SearchPresenter = ({movieResult, tvResult, loading,searchTerm,handleSubmit, error,updateTerm}) =>  (
<>
    <Helmet><time>Search | nomflix</time></Helmet>
    <Container>
            
        <Form onSubmit={handleSubmit}>
        <Input
            placeholder="Search Movies or TV Shows..."
            value={searchTerm}
            onChange={updateTerm}
        />
        </Form>
        {loading ? (
        <Loader />
            ) : (
        <>  
            <Helmet><time>Search | nomflix</time></Helmet>

            {movieResult && movieResult.length > 0 && (
            <Section title="Movie Results">
                {movieResult.map(movie => (
                <Poster key={movie.id} id={movie.id} imageUrl={movie.poster_path} title={movie.original_title} rating={movie.vote_average} year={movie.release_date && movie.release_date.substring(0,4)} isMovie={true} />
                ))}
            </Section>
            )}
            {tvResult && tvResult.length > 0 && (
            <Section title="TV Show Results">
                {tvResult.map(show => (
                <Poster key={show.id} id={show.id} imageUrl={show.poster_path} title={show.original_name} rating={show.vote_average} year={show.first_air_date && show.first_air_date.substring(0,4)}  />
                ))}
            </Section>
            )}
        </>
        )}
        {error && <Message color="#e74c3c" text={error} />}
        {tvResult && movieResult && tvResult.length === 0 && movieResult.length === 0 && <Message text="Nothing Found" color="#95a5a6" />}

    </Container>
</>
    );

SearchPresenter.propTypes ={
    movieResult: PropTypes.array, 
    tvResult: PropTypes.array, 
    
    loading: PropTypes.bool.isRequired, 
    error: PropTypes.string,
    searchTerm: PropTypes.string,
    handleSubmit : PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired
}

export default SearchPresenter;