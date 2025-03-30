import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonIcon } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import ChatFeed from '../components/ChatFeed'
import HomePage from '../components/HomePage';
import { closeCircle } from 'ionicons/icons';
import './Home.css';
import '../components/HomePage.css'
import { DATA } from '../util/data';
// import ReactTooltip from "react-tooltip"
const ReactTooltip = require('react-tooltip')


const Home: React.FC = () => {
	const [selectedPlan, setSelectedPlan] = useState<string>('basic');
	const [toggleOn, setToggleOn] = useState(false);
	console.log(DATA);
	
	const handlePlanChange = (event: CustomEvent) => {
		setSelectedPlan(event.detail.value);
	};

	const handle = () => {
		console.log('clicl');
		setToggleOn(prev => !prev)
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<img src="/assets/icon/MyStylistLogo.png" alt="ICON" style={{ marginLeft: '5px', width: '4em', height: '6em' }} />
						<IonTitle style={{ marginLeft: '10px', }}>
							<span style={{ fontWeight: '500', fontSize: '20px', wordSpacing: '-4px', letterSpacing: '-2px' }} >My Stylist</span>
							<div className='subtitle'> <span style={{ fontWeight: '400', fontSize: '16px' }} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Complete My Outlook</span></div>
						</IonTitle>
						<IonSelect
							style={{ marginRight: '5%', marginTop: '1.5em', }}
							value={selectedPlan}
							placeholder="Select Plan"
							onIonChange={handlePlanChange}
							className="hover-effect"
						>
							<IonSelectOption value="basic">Lite</IonSelectOption>
							<IonSelectOption value="premium">Elite</IonSelectOption>
							<IonSelectOption value="luxury">Signature</IonSelectOption>
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
		// <div className="container">
		// 	<img src="/assets/icon/instyleSS.png" alt="Image" />{/* mobile*/}
		// 	{/* <iframe src="https://www.instyle.com/" style={{ width: '100%', height: '80%' }} /> */}

		// 	{
		// 		toggleOn && (
		// 			<div className='home-pag'>
		// 				<IonPage className='centered-page' >
		// 					<IonHeader>
		// 						<IonToolbar>
		// 							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
		// 								<img src="/assets/icon/MyStylistLogo.png" alt="ICON" style={{ marginLeft: '20px', width: '6em', height: '6em' }} />
		// 								<IonTitle style={{ marginRight: '10px', }}>
		// 									<span style={{fontWeight: '500',fontSize:'35px',wordSpacing: '-4px',letterSpacing: '-2px'}} >My Stylist</span>
		// 									<div className='subtitle'> <span style={{ fontWeight: '400',fontSize:'16px' }} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Complete My Outlook</span></div>
		// 								</IonTitle>
		// 								<IonSelect
		// 									style={{ marginRight: '0', marginLeft: '60%', marginTop: '1.5em', }}
		// 									value={selectedPlan}
		// 									placeholder="Select Plan"
		// 									onIonChange={handlePlanChange}
		// 									className="hover-effect"
		// 								>
		// 									<IonSelectOption value="basic">Lite</IonSelectOption>
		// 									<IonSelectOption value="premium">Elite</IonSelectOption>
		// 									<IonSelectOption value="luxury">Signature</IonSelectOption>
		// 								</IonSelect>
		// 							</div>
		// 						</IonToolbar>
		// 					</IonHeader>
		// 					<IonContent fullscreen>
		// 						<IonHeader collapse="condense">
		// 							<IonToolbar>
		// 								<IonTitle size="large">Blank</IonTitle>
		// 							</IonToolbar>
		// 						</IonHeader>
		// 						{/* <ExploreContainer /> */}
		// 						<ChatFeed planInfo={selectedPlan} />
		// 					</IonContent>
		// 				</IonPage>
		// 			</div>
		// 		)
		// 	}
		// 	{
		// 		toggleOn ? (
		// 			<div className="close-btn" >
		// 				<IonIcon icon={closeCircle} style={{ fontSize: '2rem' }} onClick={handle} />
		// 			</div>

		// 		) :
		// 			(
		// 				// <div className="toggle-button" >
		// 				// 	{/* <button className="switch" > hi </button> */}
		// 				// 	<img src="/assets/icon/popUpIcon.jpg" alt="icon" className='imgIcon' onClick={handle} style={{width:'55px',height:'55px'}}/>
		// 				// </div>
		// 				<div className="toggle-button" data-tip data-for="tooltip-checkbox-element" >
		// 					<img
		// 						src="/assets/icon/popUpIcon.png"
		// 						alt="icon"
		// 						className="imgIcon"
		// 						onClick={handle}
		// 						data-tip="Tooltip content"
		// 						data-place="right"
		// 						style={{ width: '55px', height: '55px' }}
		// 					/>
		// 					{/* <Tooltip id="myTooltip" effect="solid" place="right" /> */}
		// 					<ReactTooltip id='tooltip-checkbox-element' place='top' effect='solid'> <b>Explore MyStylist</b> </ReactTooltip>
		// 				</div>
		// 			)
		// 	}


		// 	{/* <div className="toggle-button">
		// 		<label className="switch">
		// 			<input type="checkbox" checked={toggleOn} onChange={handleToggle} />
		// 			<span className="slider round"></span>
		// 		</label>
		// 	</div> */}
		// </div>
	);
};

export default Home;
