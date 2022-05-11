
import uvicorn
import pickle
import pandas as pd
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sklearn.model_selection import train_test_split

# Initializing the fast API server
app = FastAPI()

origins = [
"http://localhost",
"http://localhost:8080",
"http://localhost:3000"
]

app.add_middleware(
CORSMiddleware,
allow_origins=origins,
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

# Load ML model
log_model = pickle.load(open('../model/log_model.pkl', 'rb'))

# Defining global data for models
final_team_stats = pd.read_csv(open('../model/matchbymatch.csv','rb'), index_col = 0)[::-1]

cols =  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,33,34,37,38]
final_team_stats.drop(final_team_stats.columns[cols],axis=1, inplace=True)

features = final_team_stats.drop(columns = 'Winner')
label = final_team_stats['Winner']

x_train, x_test, y_train, y_test = train_test_split(features, label, test_size = 0.2)


# Processing props required to pass to the model
def predict_stats(Home,Away):
        Home=Home
        Away=Away
        match_by_match_stats = pd.read_csv(open('../model/matchbymatch.csv','rb'), index_col = 0)[::-1]
        total_no_of_matches = len(match_by_match_stats)
        cols=[]
        home_stats=[]
        away_stats=[]
        home_elo=0
        away_elo=0
        home_sm=0
        away_sm=0
        home_found=False
        away_found=False
        col_names=['HRFG%','HR3P%','HRFT%','HRO','HRT','HRS','HRP','ARFG%','AR3P%','ARFT%','ARO','ART','ARS','ARP','Home_elo_before','Away_elo_before','Home_sm_before','Away_sm_before']
        for i in range(total_no_of_matches-1,0,-1):
            if(match_by_match_stats['Home'][i]==Home and not home_found): 
                home_found=True
                home_elo=match_by_match_stats['Home_elo_before'][i]
                home_sm=match_by_match_stats['Home_sm_before'][i]
                home_stats.append(match_by_match_stats['HRFG%'][i])
                home_stats.append(match_by_match_stats['HR3P%'][i])
                home_stats.append(match_by_match_stats['HRFT%'][i])
                home_stats.append(match_by_match_stats['HRO'][i])
                home_stats.append(match_by_match_stats['HRT'][i])
                home_stats.append(match_by_match_stats['HRS'][i])
                home_stats.append(match_by_match_stats['HRP'][i])
            if(match_by_match_stats['Away'][i]==Away and not away_found):
                away_found=True
                away_elo=match_by_match_stats['Away_elo_before'][i]
                away_sm=match_by_match_stats['Away_sm_before'][i]
                away_stats.append(match_by_match_stats['ARFG%'][i])
                away_stats.append(match_by_match_stats['AR3P%'][i])
                away_stats.append(match_by_match_stats['ARFT%'][i])
                away_stats.append(match_by_match_stats['ARO'][i])
                away_stats.append(match_by_match_stats['ART'][i])
                away_stats.append(match_by_match_stats['ARS'][i])
                away_stats.append(match_by_match_stats['ARP'][i])
            if(home_found and away_found):
                cols.extend(home_stats)
                cols.extend(away_stats)
                cols.extend([home_elo,away_elo,home_sm,away_sm])
                break
        df=pd.DataFrame([cols],columns=col_names)
        return df

# todo
def normalize_stats():
    from sklearn import preprocessing
    team_stats = pd.read_csv(open('../model/matchbymatch.csv','rb'), index_col = 0)[::-1]
    cols =  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,33,34,37,38]
    team_stats.drop(team_stats.columns[cols],axis=1, inplace=True)

    norm_stats = preprocessing.normalize()

def team_stats(Home,Away):
        Home=Home
        Away=Away
        match_by_match_stats = pd.read_csv(open('../model/matchbymatch.csv','rb'), index_col = 0)[::-1]
        total_no_of_matches = len(match_by_match_stats)
        cols=[]
        home_stats=[]
        home_statsp=[]
        away_stats=[]
        away_statsp=[]
        home_elo=0
        away_elo=0
        home_sm=0
        away_sm=0
        home_found=False
        away_found=False
        for i in range(total_no_of_matches-1,0,-1):
            if(match_by_match_stats['Home'][i]==Home and not home_found): 
                home_found=True
                home_elo=match_by_match_stats['Home_elo_before'][i]
                home_sm=match_by_match_stats['Home_sm_before'][i]
                home_statsp.append(match_by_match_stats['HRFG%'][i])
                home_statsp.append(match_by_match_stats['HR3P%'][i])
                home_statsp.append(match_by_match_stats['HRFT%'][i])
                home_stats.append(match_by_match_stats['HRO'][i])
                home_stats.append(match_by_match_stats['HRT'][i])
                home_stats.append(match_by_match_stats['HRS'][i])
                home_stats.append(match_by_match_stats['HRP'][i])
            if(match_by_match_stats['Away'][i]==Away and not away_found):
                away_found=True
                away_elo=match_by_match_stats['Away_elo_before'][i]
                away_sm=match_by_match_stats['Away_sm_before'][i]
                away_statsp.append(match_by_match_stats['ARFG%'][i])
                away_statsp.append(match_by_match_stats['AR3P%'][i])
                away_statsp.append(match_by_match_stats['ARFT%'][i])
                away_stats.append(match_by_match_stats['ARO'][i])
                away_stats.append(match_by_match_stats['ART'][i])
                away_stats.append(match_by_match_stats['ARS'][i])
                away_stats.append(match_by_match_stats['ARP'][i])
            if(home_found and away_found):
                cols.extend([home_elo,away_elo,home_sm,away_sm])
                break
        return [home_stats,home_statsp,away_stats,away_statsp,cols]

# defining all model's stats
def model_stats():
    from sklearn import metrics
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.svm import LinearSVC
    from sklearn.neighbors import KNeighborsClassifier

    # logistic regression
    y_pred_log = log_model.predict(x_test)
    log_acc= float(metrics.accuracy_score(y_test, y_pred_log))

    # random forest
    rf = RandomForestClassifier(random_state=42)
    rf.fit(x_train, y_train)

    y_pred_rf = rf.predict(x_test)
    rf_acc= float(metrics.accuracy_score(y_test, y_pred_rf))

    # linear svc
    lsvc = LinearSVC(random_state=0, tol=1e-5, max_iter=1000)
    lsvc.fit(x_train, y_train)

    y_pred_svc = lsvc.predict(x_test)
    lsvc_acc= float(metrics.accuracy_score(y_test, y_pred_svc))

    # KNN
    knn = KNeighborsClassifier(n_neighbors=10)
    knn.fit(x_train, y_train)

    y_pred_knn = knn.predict(x_test)
    knn_acc= float(metrics.accuracy_score(y_test, y_pred_knn))

    return [log_acc,rf_acc,lsvc_acc,knn_acc]



# Defining the model input types given by the user
class Match(BaseModel):
    Home:str
    Away:str

   
# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to online NBA prediction model"}

# Setting up the prediction route
@app.post("/prediction/")
async def get_predict(data: Match):
    Home=data.Home
    Away=data.Away
    df = predict_stats(Home,Away)
    res="".join(log_model.predict(df))
    win= Home if res=='H' else Away
    return {
    "data": {
    'prediction': res,
    'interpretation': win
    }
}

@app.post("/teamstats/")
async def get_teamstats(data: Match):
    Home=data.Home.upper()
    Away=data.Away.upper()
    data=team_stats(Home,Away)
    return {
        "data": {
            'home':data[0],
            'home%':data[1],
            'away':data[2],
            'away%':data[3],
            'elosm':data[4]
        }
    }


@app.get("/modelstats/")
async def get_modelstats():
    data = model_stats()
    return {
        "data": {
            "log_acc":data[0],
            "rf_acc":data[1],
            "lsvc_acc":data[2],
            "knn_acc":data[3]
        }
    }



# Configuring the server host and port
if __name__ == '__main__':  
    uvicorn.run(app, port=8080, host='0.0.0.0')