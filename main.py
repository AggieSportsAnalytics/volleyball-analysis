import streamlit as st
from pages import page_1, page_2, page_3, page_4

if 'page' not in st.session_state:
    st.session_state.page = 1
if 'selected_team' not in st.session_state:
    st.session_state.selected_team = None


def set_page(page_number):
    st.session_state.page = page_number

if st.session_state.page == 1:
    page_1(set_page)
elif st.session_state.page == 2:
    page_2(set_page)
elif st.session_state.page == 3:
    page_3(set_page)
elif st.session_state.page == 4:
    page_4(set_page)
