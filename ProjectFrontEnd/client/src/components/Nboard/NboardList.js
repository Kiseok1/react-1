import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import $ from 'jquery';
import Swal from 'sweetalert2'

class NboardList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            responseNboardList: '',
            responseSboardList: '',
            append_NboardList: '',
            append_SboardList: '',
            currentPage: 1,
            totalPages: '',
            startPage: '',
            endPage: '',
            keyword: '',
            searchtype: ''
        }
    }

    componentDidMount() {
        alert("새로고침")
        this.callNboardListApi(this.state.currentPage)
        $("#spaging").hide();
    }

    callNboardListApi = async (page) => {
        axios.get(`/api/nBoard/list/${page}`)
            .then(response => {
                try {
                    this.setState({ responseNboardList: response });
                    this.setState({ append_NboardList: this.nBoardListAppend() });
                    this.setState({ totalPages: response.data.pageMaker.totalPage });
                    this.setState({ startPage: response.data.pageMaker.startPage });
                    this.setState({ endPage: response.data.pageMaker.endPage });
                } catch (error) {
                    alert('작업중 오류가 발생하였습니다1.');
                }
            })
            .catch(error => { alert('작업중 오류가 발생하였습니다2.'); return false; });
    }


    callSboardListApi = async (page) => {
        alert(this.state.searchtype)
        alert(this.state.keyword)
        axios.get(`/api/nBoard/list/${page}?searchType=${this.state.searchtype}&keyword=${this.state.keyword}`)
            .then(response => {
                try {
                    this.setState({ responseSboardList: response });
                    this.setState({ append_SboardList: this.sBoardListAppend() });
                    const totalPages = response.data.pageMaker.totalPage;
                    const startPage = response.data.pageMaker.startPage;
                    const endPage = response.data.pageMaker.endPage;
                    this.setState({ totalPages, startPage, endPage });
                    $("#cpaging").hide();
                    $("#spaging").show();

                } catch (error) {
                    alert('작업중 오류가 발생하였습니다1.');
                }
            })
            .catch(error => { alert('작업중 오류가 발생하였습니다2.'); return false; });
    }
   
    handlePageClick = (page) => {
        if(this.state.keyword == '' || this.state.searchtype == '') {
            this.setState({ currentPage: page }, () => {
                this.callNboardListApi(page);
            });
        } else {
            this.setState({ currentPage: page }, () => {
                this.callSboardListApi(page);
            });
        }
    }

    renderPagination = () => {
        const { currentPage, totalPages } = this.state;
        const pagesPerGroup = 5; // 페이지 그룹 당 페이지 수
        const pageNumbers = [];
        const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);
        const startPage = this.state.startPage;
        const endPage = this.state.endPage;


        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button style={{ margin: 5 }} className="sch_bt99 wi_au" key={i} onClick={() => this.handlePageClick(i)}>
                    {i}
                </button>
            );
        }

        const prevGroupStart = startPage - pagesPerGroup;
        const nextGroupStart = startPage + pagesPerGroup;

        return (
            <div className="Paging">
                {currentPageGroup > 1 && (
                    <button style={{ margin: 5 }} className="sch_bt99 wi_au" onClick={() => this.handlePageClick(prevGroupStart)}>
                        {'<'}
                    </button>
                )}
                {pageNumbers}
                {endPage < totalPages && (
                    <button style={{ margin: 5 }} className="sch_bt99 wi_au" onClick={() => this.handlePageClick(nextGroupStart)}>
                        {'>'}
                    </button>
                )}
            </div>
        );
    }


    renderSearchPagination = () => {
        const { currentPage, totalPages, startPage, endPage } = this.state;
        const pagesPerGroup = 5; // 페이지 그룹 당 페이지 수
        const pageNumbers = [];
        const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button style={{ margin: 5 }} className="sch_bt99 wi_au" key={i} onClick={() => this.handlePageClick(i)}>
                    {i}
                </button>
            );
        }

        const prevGroupStart = startPage - pagesPerGroup;
        const nextGroupStart = startPage + pagesPerGroup;

        return (
            <div className="Paging">
                {currentPageGroup > 1 && (
                    <button style={{ margin: 5 }} className="sch_bt99 wi_au" onClick={() => this.handlePageClick(prevGroupStart)}>
                        {'<'}
                    </button>
                )}
                {pageNumbers}
                {endPage < totalPages && (
                    <button style={{ margin: 5 }} className="sch_bt99 wi_au" onClick={() => this.handlePageClick(nextGroupStart)}>
                        {'>'}
                    </button>
                )}
            </div>
        );
    }

    nBoardListAppend = () => {
        let result = []
        var nBoardList = this.state.responseNboardList.data.list
        // var jsonString = JSON.stringify(nBoardList)
        // alert(jsonString);

        for (let i = 0; i < nBoardList.length; i++) {
            var data = nBoardList[i]
            const formattedDate = new Date(data.regidate).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                // hour: '2-digit',
                // minute: '2-digit',
                // second: '2-digit',
                // timeZoneName: 'short'
            });

            result.push(
                <tr class="hidden_type">
                    <td>{data.bno}</td>
                    <td>{data.title}{'['}{data.replyCnt}{']'}</td>
                    <td>{data.writer}</td>
                    <td>{data.viewCnt}</td>
                    <td>{formattedDate}</td>
                </tr>
            )
        }
        return result
    }

    sBoardListAppend = () => {
        let result = []
        var sBoardList = this.state.responseSboardList.data.list
        // var jsonString = JSON.stringify(nBoardList)
        // alert(jsonString);

        for (let i = 0; i < sBoardList.length; i++) {
            var data = sBoardList[i]
            const formattedDate = new Date(data.regidate).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                // hour: '2-digit',
                // minute: '2-digit',
                // second: '2-digit',
                // timeZoneName: 'short'
            });

            result.push(
                <tr class="hidden_type">
                    <td>{data.bno}</td>
                    <td>{data.title}{'['}{data.replyCnt}{']'}</td>
                    <td>{data.writer}</td>
                    <td>{data.viewCnt}</td>
                    <td>{formattedDate}</td>
                </tr>
            )
        }
        return result
    }

    handleSearchValChange = (e) => {
        this.setState({ keyword: e.target.value });
    };

    handleSearchTypeChange = (e) => {
        this.setState({ searchtype: e.target.value });
    };


    handleSearchButtonClick = (e) => {
        e.preventDefault();
        $("#appendNboardList").hide();
        this.callSboardListApi(this.state.currentPage); // 검색 버튼 클릭 시 검색 기능 호출
    };
    
    render() {
        return (
            <section class="sub_wrap" >
                <article class="s_cnt mp_pro_li ct1 mp_pro_li_admin">
                    <div class="li_top">
                        <h2 class="s_tit1">공 지 사 항</h2>
                        <div class="li_top_sch af">
                            <Link to={'/NboardRegister'} className="sch_bt2 wi_au">글쓰기</Link>
                        </div>
                    </div>

                    <div class="list_cont list_cont_admin">
                        <table class="table_ty1 ad_tlist">
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>조회수</th>
                                <th>작성일</th>
                            </tr>
                        </table>
                        <table id= "appendNboardList" class="table_ty2 ad_tlist">
                            {this.state.append_NboardList}
                        </table>
                        <table id= "appendSboardList" class="table_ty2 ad_tlist">
                            {this.state.append_SboardList}
                        </table>
                    </div>
                    <br></br>
                    <div id="cpaging">
                        {this.renderPagination()}
                    </div>
                    <div id="spaging">
                    {this.renderSearchPagination()}
                    </div>
                    <br></br>
                    <div className="searchingForm" >
                    <form onSubmit={(e) => this.handleSearchButtonClick(e)}>
                        <select value={this.state.searchtype} onChange={this.handleSearchTypeChange} className="searchzone">
                            <option value="">선택</option>
                            <option value="t">제목</option>
                            <option value="c">내용</option>
                            <option value="w">작성자</option>
                        </select>
                        <input className='search'
                            type="text"
                            placeholder="검색어를 입력해주세요."
                            value={this.state.keyword}
                            onChange={this.handleSearchValChange}
                        />
                        <button type="submit" className="sch_bt99 wi_au">검색</button>
                    </form>
                    </div>
                </article>
            </section>
        );
    }
}

export default NboardList;