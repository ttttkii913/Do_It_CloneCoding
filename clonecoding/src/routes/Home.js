import React from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get('https://yts.mx/api/v2/list_movies.json?sort_by=rating');
    
    this.setState({ movies, isLoading: false }, () => {
      AOS.init({ 
        duration: 1000,  // 애니메이션 지속 시간
        once: false,      // 스크롤 시 반복 실행 가능
        mirror: true,
        offset: 100,      // 화면에 나타나기 100px 전부터 실행
      });
    });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie, index) => (
              <div key={movie.id} 
                   className="movie-card"
                   data-aos="fade-up" 
                   data-aos-delay={index * 100}> {/* 순차적으로 등장 */}
                <Movie
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
