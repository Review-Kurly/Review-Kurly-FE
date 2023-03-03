import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../common/Button';
import { FaSearch } from 'react-icons/fa';
import { BsHeart, BsClipboardPlus } from 'react-icons/bs';
import logo from '../../styles/img/logo.svg';
import useInputOnChange from '../../feature/hooks/useInputOnChange';

export default function Header() {
  const [{ search }, titleInputHanlder] = useInputOnChange({ search: '' });
  //console.log(search);

  const navigate = useNavigate();

  const moveToAddReview = () => navigate('/add-review');

  return (
    <>
      {/* 로고 & 검색창 */}
      <HeaderStyles>
        <HeaderWrapper>
          <HeaderLoginWrapper>
            <Login to={'/'} color={'#5F0080'}>
              회원가입
            </Login>
            <div />
            <Login>로그인</Login>
          </HeaderLoginWrapper>
          <HeaderLogoContainer>
            <Link to="/">
              <LogoImg src={logo} alt="리뷰컬리" />
            </Link>
            <LogoLink to="/">리뷰컬리</LogoLink>
          </HeaderLogoContainer>
          {/* 검색창 */}
          <HeaderSearchWrapper>
            <HeaderSearchContainer>
              <HeaderSearchInput
                name="search"
                value={search}
                onChange={titleInputHanlder}
              />
              <Button search>
                <FaSearch size={'1.25rem'} />
              </Button>
            </HeaderSearchContainer>
          </HeaderSearchWrapper>
          {/* 좋아요 & 게시글 등록 */}
          <HeaderAddReviewWrapper>
            <AddReviewContainer>
              <Button onClick={moveToAddReview} addAndHeart>
                <BsClipboardPlus />
              </Button>
              <Button addAndHeart>
                <BsHeart />
              </Button>
            </AddReviewContainer>
          </HeaderAddReviewWrapper>
        </HeaderWrapper>
      </HeaderStyles>
      {/* 카테고리 */}
      <HeaderCategoryWrapper>
        <CategoryContainer>
          <CategoryUl>
            <CategoryLi>
              <Link to={'/new-review'}>신규 리뷰</Link>
            </CategoryLi>
            <CategoryLi>
              <Link to={'/best-review'}>베스트 리뷰</Link>
            </CategoryLi>
            <CategoryLi>
              <Link to={'/mypage'}>마이 페이지</Link>
            </CategoryLi>
          </CategoryUl>
        </CategoryContainer>
      </HeaderCategoryWrapper>
    </>
  );
}

const HeaderStyles = styled.header`
  position: relative;
  width: 1050px;
  height: 6.25rem;
  margin: 0px auto;
  letter-spacing: -0.3px;
`;

const HeaderLoginWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  height: 1.875rem;
  z-index: 20;
  display: flex;
  align-items: center;
  font-size: 12px;
  div {
    width: 1px;
    height: 13px;
    margin: 0px 12px;
    background-color: #d9d9d9;
  }
`;

const Login = styled(Link)`
  display: block;
  color: ${(props) => props.color};
`;

const HeaderWrapper = styled.div`
  height: 100px;
  padding-top: 2.25rem;
`;

const HeaderLogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 3.9375rem;
`;

const LogoImg = styled.img`
  height: 40px;
  display: block;
`;

const LogoLink = styled(Link)`
  position: relative;
  flex-shrink: 0;
  margin-left: 20px;
  font-size: ${(props) => props.theme.FS.m};
  color: ${(props) => props.theme.CL.brandColor};
  font-weight: normal;
  line-height: 1.33;
  letter-spacing: normal;
  font-weight: bold;
  &:after {
    content: '';
    position: absolute;
    display: block;
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSI3IiB2aWV3Qm94PSIwIDAgNyA3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPHBhdGggZD0iTTUuMTA4IDd2LS4wMDdMMS45MTEgMi41NzdWN0guMDQ2VjBoMS44NjdsMy4xOTYgNC40MTlWMGgxLjg2N3Y3SDUuMTA4eiIgZmlsbD0iI0ZBNjIyRiIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPgo=)
      0px 0px no-repeat;
    width: 10px;
    height: 10px;
    top: 3px;
    right: -13px;
  }
`;

const HeaderSearchWrapper = styled.div`
  position: relative;
  width: 1050px;
  margin: 0px auto;
`;

const HeaderSearchContainer = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  position: absolute;
  left: 20.3125rem;
  top: -3.4375rem;
  width: 500px;
  height: 48px;
  padding-left: 14px;
  border: 1px solid ${(props) => props.theme.CL.brandColor};
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: #ffffff 0px 0px 0px 1px inset;
`;

const HeaderSearchInput = styled.input`
  width: 400px;
  background-color: inherit;
  border: none;
  outline: none;
  letter-spacing: -0.33px;
`;

const HeaderAddReviewWrapper = styled(
  HeaderSearchWrapper.withComponent('div')
)``;

const AddReviewContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: -6px;
  top: -49px;
  button:hover {
    color: ${(props) => props.theme.CL.brandColor};
  }
`;

const HeaderCategoryWrapper = styled.div`
  min-width: 1050px;
  letter-spacing: -0.3px;
  background-color: #ffffff;
  position: relative;
  box-shadow: rgb(0 0 0 / 7%) 0px 3px 4px 0px;
  width: 100%;
  z-index: 10;
`;

const CategoryContainer = styled.div`
  position: relative;
  ${(props) => props.theme.FlexRow}
  width: 1050px;
  height: 56px;
  margin: 0px auto;
`;

const CategoryUl = styled.ul`
  display: flex;
`;

const CategoryLi = styled.li`
  ${(props) => props.theme.FlexRow}
  width: 150px;
  height: 55px;
  padding-top: 18px;
  line-height: 20px;
  text-align: center;
  > a:hover {
    color: ${(props) => props.theme.CL.brandColor};
    text-decoration: underline;
  }
`;
