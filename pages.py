import streamlit as st
import os
import pandas as pd
import matplotlib.pyplot as plt

def page_1(set_page):
    # st.markdown(
    #     """
    #     <style>
    #     body {
    #         background-color: #333133;
    #         color: white;
    #     }
    #     .title {
    #         text-align: center;
    #         color: #091861;
    #     }
    #     .logo-container {
    #         display: flex;
    #         justify-content: center;
    #         margin-top: 50px;
    #         margin-bottom: 50px;
    #     }
    #     .logo-container img {
    #         max-width: 100%;
    #         height: auto;
    #     }
    #     .start-button-container {
    #         display: flex;
    #         justify-content: center;
    #     }
    #     .stButton button {
    #         background-color: #091861;
    #         color: white;
    #     }
    #     .stImage{
    #         margin-left: auto;
    #         margin-right: auto;
    #     }
    #     </style>
    #     """,
    #     unsafe_allow_html=True
    # )

    # TODO -- center all of these (not sure if possible in streamlit)
    st.markdown("<h1 class='title'>VolleyViz</h1>", unsafe_allow_html=True)

    st.image('logo2.png', width=400)

    if st.button("Start"):
        set_page(2)
        st.rerun()


def page_2(set_page):
    st.title("Choose a Team")
    fp = 'raw/2016/team_stats'

    teams = []

    for school in os.listdir(fp):
        teams.append(os.path.splitext(school)[0])

    selected_team = st.selectbox("Select a team:", teams)
    if st.button("Next"):
        st.session_state.selected_team = selected_team
        st.session_state.fp = f'{fp}/{st.session_state.selected_team}.csv'
        set_page(3)
        st.rerun()

def page_3(set_page):
    st.title(f"Dashboard for {st.session_state.selected_team}")
    df = pd.read_csv(st.session_state.fp)
    st.write("Here is the dashboard with stats and charts.")

    col1, col2 = st.columns(2)

    size = (16, 12)

    with col1:
        # Histogram of Player Heights
        fig, ax = plt.subplots(figsize=size)
        df['Pos'].value_counts().plot(kind='bar', color='orange', ax=ax)
        ax.set_title('Count of Players by Position')
        ax.set_xlabel('Position')
        ax.set_ylabel('Count')
        ax.set_xticks(ax.get_xticks())
        ax.set_xticklabels(ax.get_xticklabels(), rotation=45)
        ax.grid(axis='y')
        st.pyplot(fig)
    
    with col2:
        # Histogram of Player Heights
        fig, ax = plt.subplots(figsize=size)
        ax.hist(df['Ht'], bins=10, color='skyblue', edgecolor='black')
        ax.set_title('Distribution of Player Heights')
        ax.set_xlabel('Height (inches)')
        ax.set_ylabel('Frequency')
        ax.grid(True)
        st.pyplot(fig)

    if st.button("Compare"):
        set_page(4)
        st.rerun()

def page_4(set_page):
    st.title(f"Comparison for {st.session_state.selected_team}")
    st.write("Here is the comparison view.")

    if st.button("Back to Dashboard"):
        set_page(1)
        st.rerun()
