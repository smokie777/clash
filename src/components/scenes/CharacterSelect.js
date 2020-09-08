import { useState } from 'react';
import { jsx, css } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
import { Image, Spacer, FlexContainer, Text, Button, FlexItem } from '../particles';
import { characters } from './characters';
import { Card, cardWidth, cardHeight } from '../card/Card';
import { colors } from '../styles';
import * as actions from '../../stores/actions';

const characterSelectCss = css`
  .showcase {
    .showcase_image {
      margin-right: 20px;
    }

    .card {
      margin-right: 7px;
  
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .thumbnails {
    .thumbnail {
      box-sizing: content-box;
      cursor: pointer;
      border-radius: 3px;
      margin: 0 5px;

      .image {
        transform-origin: bottom;
        transition: transform 0.25s ease-out;
      }

      &:hover {
        border-bottom: 3px solid ${colors.yellow};

        .image {
          transform: scale(1.15);
        }
      }
    }
  }
`;

export const CharacterSelect = () => {
  const dispatch = useDispatch();
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);

  const continueOnClick = (name, image, cards) => {
    dispatch(actions.setPlayer({ name, image }));
    dispatch(actions.addCardsToCollection(cards));
    dispatch(actions.setScene('town'));
  };

  return (
    <div css={characterSelectCss}>
      <Spacer height={20} />
      <Text type='title' centered>Character Selection</Text>
      <Spacer height={40} />

      <div className='showcase'>
        <FlexContainer justifyContent='center'>
          <Image
            src={`${characters[selectedCharIndex].image}.png`}
            width={cardWidth * 2}
            height={cardHeight * 2}
            size='contain'
            className='showcase_image'
          />
          <FlexContainer flexDirection='column'>
            <Text type='header'>{characters[selectedCharIndex].name}</Text>
            <Spacer height={30} />
            <Text>Additional starting cards:&nbsp;</Text>
            <Spacer height={5} />
            <FlexContainer className='cards'>
              {characters[selectedCharIndex].startingCards.map((i, index) => (
                <Card key={index} name={i} />
              ))}
            </FlexContainer>
            <FlexItem />
            <Button
              mini
              onClick={() => continueOnClick(
                characters[selectedCharIndex].name,
                characters[selectedCharIndex].image,
                characters[selectedCharIndex].startingCards
              )}
            >
              <Text type='small'>Play as {characters[selectedCharIndex].name}</Text>
            </Button>
            <Spacer height={10} />
          </FlexContainer>
        </FlexContainer>
      </div>

      <Spacer height={20} />

      <FlexContainer className='thumbnails' justifyContent='center'>
        {characters.map((i, index) => (
          <div key={i.name} className='thumbnail'>
            <Image
              src={`${i.image}.png`}
              width={cardHeight / 2}
              height={cardHeight / 2}
              onMouseEnter={() => setSelectedCharIndex(index)}
              size='contain'
            />
          </div>
        ))}
      </FlexContainer>
    </div>
  );
};
