import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSelect,IonSelectOption } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import ChatFeed from '../components/ChatFeed'
import './Home.css';

const Home: React.FC = () => {
	const [selectedPlan, setSelectedPlan] = useState<string>('basic');

	const handlePlanChange = (event: CustomEvent) => {
	  setSelectedPlan(event.detail.value);
	};
	return (
		<IonPage>
			<IonHeader>
			<IonToolbar>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<img src="/assets/icon/myStylistIcon.png" alt="ICON" style={{marginLeft:'20px',width:'6em',height:'6em'}}/>
            <IonTitle style={{ marginRight: '10px',color:'white' }}>MyStylist</IonTitle>
            <IonSelect
              style={{ marginRight: '0', marginLeft: '70%',marginTop:'1.5em',color:'white' }}
              value={selectedPlan}
              placeholder="Select Plan"
              onIonChange={handlePlanChange}
            >
              <IonSelectOption value="basic">Basic plan</IonSelectOption>
              <IonSelectOption value="premium">Premium plan</IonSelectOption>
              <IonSelectOption value="luxury">Luxury plan</IonSelectOption>
            </IonSelect>
          </div>
        </IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Blank</IonTitle>
					</IonToolbar>
				</IonHeader>
				{/* <ExploreContainer /> */}
				<ChatFeed planInfo={selectedPlan} />
			</IonContent>
		</IonPage>
	);
};

export default Home;
