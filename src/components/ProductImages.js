import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({
  images = [
    {
      url: '',
      filename: '',
      thumbnails: {
        large: {
          url: '',
        },
      },
    },
  ],
}) => {
  const [main, setMain] = useState(images[0])
	
  return (
    <Wrapper>
      <img src={main.url} alt={main.filename} className='main' />
      <div className='gallery'>
        {images.map((img, index) => {
          const { thumbnails, filename } = img
          return (
            <img
              key={index}
              src={thumbnails.large.url}
              alt={filename}
              onClick={() => setMain(images[index])}
              className={`${img.url === main.url ? 'active' : null}`}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
