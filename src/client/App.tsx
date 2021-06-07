import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import SimpleImageSlider from "react-simple-image-slider";

const images = [
	{ url: "./assets/images/meow.jpeg"},
	{ url: "./assets/images/details-1.jpeg"},
	{ url: "./assets/images/details-2.jpeg"},
	{ url: "./assets/images/details-3.jpeg"},
	{ url: "./assets/images/details-4.jpeg"},
	{ url: "./assets/images/room-1.jpeg"}
  ]
  type SliderOptions = {
	useGPURender: boolean;
	showNavs: boolean;
	showBullets: boolean;
	navStyle: 1 | 2;
	navSize: number;
	navMargin: number;
	duration: number;
	bgColor: string;
  };

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
	const [greeting, setGreeting] = useState<string>('');

	useEffect(() => {
		async function getGreeting() {
			try {
				const res = await fetch('/api/hello');
				const greeting = await res.json();
				setGreeting(greeting);
			} catch (error) {
				console.log(error);
			}
		}
		getGreeting();
	}, []);

	const [sliderOptions, setSliderOptions] = useState<SliderOptions>({
		useGPURender: true,
		showNavs: true,
		showBullets: true,
		navStyle: 1,
		navSize: 50,
		navMargin: 30,
		duration: 0.5,
		bgColor: '#000'
	  });
	
	  const [slideIndexText, setSlideIndexText] = useState<string>('');
	
	  const onClick = useCallback((idx: number, event: React.SyntheticEvent) => {
		console.log(`[App onClick] ${idx} ${event.currentTarget}`);
	  }, []);
	
	  const onClickNav = useCallback((toRight: boolean) => {
		console.log(`[App onClickNav] ${toRight}`);
	  }, []);
	
	  const onClickBullets = useCallback((idx: number) => {
		console.log(`[App onClickBullets] ${idx}`);
	  }, []);
	
	  const onStartSlide = useCallback((idx: number, length: number) => {
		console.log(`[App onStartSlide] ${idx}/${length}`);
		setSlideIndexText(`${idx} / ${length}`);
	  }, []);
	
	  const onCompleteSlide = useCallback((idx: number, length: number) => {
		console.log(`[App onCompleteSlide] ${idx}/${length}`);
		setSlideIndexText(`${idx} / ${length}`);
	  }, []);

	return (
		<main className="container my-5">
			<h1 className="text-primary text-center">Hello {greeting}!</h1>
			{/* <img src={"./assets/images/meow.jpeg"}/> */}

			<div>
      <SimpleImageSlider
        style={{ margin: '0 auto', marginTop: '50px' }}
        width={896}
        height={504}
        images={images}
        showBullets={sliderOptions.showBullets}
        showNavs={sliderOptions.showNavs}
        useGPURender={sliderOptions.useGPURender}
        navStyle={sliderOptions.navStyle}
        navSize={sliderOptions.navSize}
        navMargin={sliderOptions.navMargin}
        slideDuration={sliderOptions.duration}
        onClick={onClick}
        onClickNav={onClickNav}
        onClickBullets={onClickBullets}
        onStartSlide={onStartSlide}
        onCompleteSlide={onCompleteSlide}
      />
    </div>
		</main>
	);
};

interface AppProps {}

/* CLASS REACT EXAMPLE */
// class App extends React.Component<IAppProps, IAppState> {
// 	constructor(props: IAppProps) {
// 		super(props);
// 		this.state = {
// 			name: null
// 		};
// 	}

// 	async componentDidMount() {
// 		try {
// 			let r = await fetch('/api/hello');
// 			let name = await r.json();
// 			this.setState({ name });
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}

// 	render() {
// 		return (
// 			<main className="container my-5">
// 				<h1 className="text-primary text-center">Hello {this.state.name}!</h1>
// 			</main>
// 		);
// 	}
// }

// export interface IAppProps {}

// export interface IAppState {
// 	name: string;
// }

export default App;
