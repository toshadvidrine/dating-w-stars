/**
 * ## Sweph
 * Definitive Swiss Ephemeris bindings for Node.js  
 * 
 * [Official documentation for the Swiss Ephemeris](https://www.astro.com/swisseph/swephprg.htm)  
 * [Sweph on Github](https://github.com/timotejroiko/sweph)  
 * [Sweph on NPM](http://npm.com/package/sweph)  
 * 
 * ### Usage
 * ```
 * const { utc_to_jd, calc, houses_ex2, constants, set_ephe_path } = require("sweph");
 * // or - import { utc_to_jd, calc, houses, constants, set_ephe_path } from "sweph";
 *
 * set_ephe_path("./ephemeris"); // folder containing your ephemeris files;
 *
 * const date = utc_to_jd(2020, 1, 25, 15, 35, 0, constants.SE_GREG_CAL);
 * if(date.flag !== constants.OK) { throw new Error(date.error); }
 *
 * const [ jd_et, jd_ut ] = date.data;
 * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
 * const planets = calc(jd_et, constants.SE_SUN, flags);
 * if(planets.flag !== flags) { console.log(planets.error); }
 *
 * const houses = houses_ex2(jd_ut, 0, 37, 54, "P");
 * if(houses.flag !== constants.OK) { console.log(houses.error) }
 *
 * console.log(planets.data, houses.data)
 * ```
 */
declare module "sweph" {

	interface Flag {
		/**
		 * ### Description
		 * Status flag returned by the function  
		 * Use it to check if the function succeeded, failed, or to check output type  
		 * ```
		 * ```
		 */
		flag: number;
	}
	
	interface Error {
		/**
		 * ### Description
		 * Error message  
		 * An error message will be available here when the flag indicates failure  
		 * ```
		 * ```
		 */
		error: string;
	}

	interface Name {
		/**
		 * ### Description
		 * Star name  
		 * The full star name as it appears in the sefstars.txt file  
		 * ```
		 * ```
		 */
		name: string;
	}

	interface GetCurrentFileData {
		/**
		 * ### Description
		 * Path to ephemeris file  
		 * ```
		 * ```
		 */
		path: string;
		/**
		 * ### Description
		 * Ephemeris start date for this file  
		 * ```
		 * ```
		 */
		start: number;
		/**
		 * ### Description
		 * Ephemeris end date for this file  
		 * ```
		 * ```
		 */
		end: number;
		/**
		 * ### Description
		 * JPL ephemeris version used to generate the file  
		 * ```
		 * ```
		 */
		denum: number;
	}

	interface GetOrbitalElements extends Flag, Error {
		/**
		 * ### Description
		 * Array of orbital/kepler elements  
		 * ```
		 * ```
		 */
		data: [
			/**
			 * Semimajor axis
			 */
			a: number,
			/**
			 * Eccentricity
			 */
			e: number,
			/**
			 * Inclination
			 */
			i: number,
			/**
			 * Longitude of ascending node
			 */
			Ω: number,
			/**
			 * Argument of periapsis
			 */
			ω: number,
			/**
			 * Longitude of periapsis
			 */
			ϖ: number,
			/**
			 * Mean anomaly at epoch
			 */
			M0: number,
			/**
			 * True anomaly at epoch
			 */
			v0: number,
			/**
			 * Eccentric anomaly at epoch
			 */
			E0: number,
			/**
			 * Mean longitude at epoch
			 */
			L0: number,
			/**
			 * Sidereal orbital period in tropical years
			 */
			sidereal_period: number,
			/**
			 * Mean daily motion
			 */
			daily_motion: number,
			/**
			 * Tropical period in years
			 */
			tropical_period: number,
			/**
			 * Synodic period in days  
			 * Negative, if inner planet (Venus, Mercury, Aten asteroids) or Moon
			 */
			synodic_period: number,
			/**
			 * Time of perihelion passage
			 */
			perihelion_passage: number,
			/**
			 * Perihelion distance
			 */
			perihelion_distance: number,
			/**
			 * Aphelion distance
			 */
			aphelion_distance: number
		]
	}

	interface Calc extends Error, Flag {
		/**
		 * ### Description
		 * Array of values returned by the calculation  
		 * By default the values are in ecliptic coordinates (longitude, latitude, distance)  
		 * If `SEFLG_SPEED` or `SEFLG_SPEED3` are used, the daily speeds for each value are also retured, otherwise they are 0  
		 * If `SEFLG_EQUATORIAL` is used, the values are in equatorial coordinates instead (right ascension, declination, distance)  
		 * If `SELFG_XYZ` is used, the values are in cartesian coordinates instead (X, Y, Z)  
		 * If target object ID is `SE_ECL_NUT`, then the values will contain obliquity and nutation data instead  
		 * ```
		 * ```
		 */
		data: [
			/**
			 * (`λ`) Ecliptic longitude  
			 * (`α`) Equatorial right ascension if `SEFLG_EQUATORIAL`  
			 * (`x`) Cartesian X if `SEFLG_XYZ`  
			 * (`ε`) True obliquity of the ecliptic if object ID is `SE_ECL_NUT`
			 */
			lon: number,
			/**
			 * (`β`) Ecliptic latitude  
			 * (`δ`) Equatorial declination if `SEFLG_EQUATORIAL`  
			 * (`y`) Cartesian Y if `SEFLG_XYZ`  
			 * (`ε`) Mean obliquity of the ecliptic if object ID is `SE_ECL_NUT`
			 */
			lat: number,
			/**
			 * (`au`) Distance in AU  
			 * (`z`) Cartesian Z if `SEFLG_XYZ`  
			 * (`Δψ`) Nutation in longitude if oject ID is `SE_ECL_NUT`
			 */
			dist: number,
			/**
			 * (`λs`) Ecliptic longitude daily speed  
			 * (`αs`) Equatorial right ascension daily speed if `SEFLG_EQUATORIAL`  
			 * (`xs`) Cartesian daily speed if `SEFLG_XYZ`  
			 * (`Δε`) Nutation in obliquity if oject ID is `SE_ECL_NUT`
			 */
			lonSpd: number,
			/**
			 * (`βs`) Ecliptic latitude daily speed  
			 * (`δs`) Equatorial declination daily speed if `SEFLG_EQUATORIAL`  
			 * (`ys`) Cartesian Y daily speed if `SEFLG_XYZ` 
			 */
			latSpd: number,
			/**
			 * (`aus`) Distance daily speed in AU  
			 * (`zs`) Cartesian Z daily speed if `SEFLG_XYZ`  
			 */
			distSpd: number
		]
	}

	interface DateConversion extends Flag {
		/**
		 * ### Description
		 * Julian day value
		 * ```
		 * ```
		 */
		data: number
	}

	interface DeltaT extends Error {
		/**
		 * ### Description
		 * Delta T value
		 * ```
		 * ```
		 */
		data: number
	}

	interface FixStar extends Flag, Name, Error {
		/**
		 * ### Description
		 * Array of values returned by the calculation  
		 * By default the values are in ecliptic coordinates (longitude, latitude, distance)  
		 * If `SEFLG_SPEED` or `SEFLG_SPEED3` are used, the daily speeds for each value are also retured, otherwise they are 0  
		 * If `SEFLG_EQUATORIAL` is used, the values are in equatorial coordinates instead (right ascension, declination, distance)  
		 * If `SELFG_XYZ` is used, the values are in cartesian coordinates instead (X, Y, Z)  
		 * ```
		 * ```
		 */
		 data: [
			/**
			 * (`λ`) Ecliptic longitude  
			 * (`α`) Equatorial right ascension if `SEFLG_EQUATORIAL`  
			 * (`x`) Cartesian X if `SEFLG_XYZ`  
			 */
			lon: number,
			/**
			 * (`β`) Ecliptic latitude  
			 * (`δ`) Equatorial declination if `SEFLG_EQUATORIAL`  
			 * (`y`) Cartesian Y if `SEFLG_XYZ`  
			 */
			lat: number,
			/**
			 * (`au`) Distance in AU  
			 * (`z`) Cartesian Z if `SEFLG_XYZ`  
			 */
			dist: number,
			/**
			 * (`λs`) Ecliptic longitude daily speed  
			 * (`αs`) Equatorial right ascension daily speed if `SEFLG_EQUATORIAL`  
			 * (`xs`) Cartesian daily speed if `SEFLG_XYZ`  
			 */
			lonSpd: number,
			/**
			 * (`βs`) Ecliptic latitude daily speed  
			 * (`δs`) Equatorial declination daily speed if `SEFLG_EQUATORIAL`  
			 * (`ys`) Cartesian Y daily speed if `SEFLG_XYZ` 
			 */
			latSpd: number,
			/**
			 * (`aus`) Distance daily speed in AU  
			 * (`zs`) Cartesian Z daily speed if `SEFLG_XYZ`  
			 */
			distSpd: number
		]
	}

	interface FixStarMag extends Flag, Name, Error {
		/**
		 * ### Description
		 * Magnitude value
		 * ```
		 * ```
		 */
		data: number
	}

	interface GauquelinSector extends Flag, Error {
		/**
		 * ### Description
		 * Gauquelin Sector
		 * ```
		 * ```
		 */
		data: number
	}

	interface Ayanamsa extends Flag, Error {
		/**
		 * ### Description
		 * Ayanamsa Value
		 * ```
		 * ```
		 */
		data: number
	}

	interface HeliacalPheno extends Flag, Error {
		/**
		 * ### Description
		 * Array of values used by heliacal calculations  
		 * ```
		 * ```
		 */
		data: [
			/**
			 * Topocentric altitude of object in degrees (unrefracted)
			 */
			AltO: number,
			/**
			 * Apparent altitude of object in degrees (refracted)
			 */
			AppAltO: number,
			/**
			 * Geocentric altitude of object in degrees
			 */
			GeoAltO: number,
			/**
			 * Azimuth of object in degrees
			 */
			AziO: number,
			/**
			 * Topocentric altitude of Sun in degrees
			 */
			AltS: number,
			/**
			 * Azimuth of Sun in degrees
			 */
			AziS:number,
			/**
			 * Actual topocentric arcus visionis in degrees
			 */
			TAVact: number,
			/**
			 * Actual (geocentric) arcus visionis in degrees
			 */
			ARCVact: number,
			/**
			 * Actual difference between object's and sun's azimuth in degrees
			 */
			DAZact: number,
			/**
			 * Actual longitude difference between object and sun in degrees
			 */
			ARCLact: number,
			/**
			 * Extinction coefficient
			 */
			kact: number,
			/**
			 * Smallest topocentric arcus visionis in degrees
			 */
			minTAV: number,
			/**
			 * First time object is visible:number, according to VR in JD
			 */
			TfistVR: number,
			/**
			 * optimum time the object is visible:number, according to VR in JD
			 */
			TbVR: number,
			/**
			 * last time object is visible:number, according to VR in JD
			 */
			TlastVR: number,
			/**
			 * best time the object is visible:number, according to Yallop in JD
			 */
			TbYallop: number,
			/**
			 * crescent width of Moon in degrees
			 */
			WMoon: number,
			/**
			 * q-test value of Yallop
			 */
			qYal: number,
			/**
			 * q-test criterion of Yallop
			 */
			qCrit: number,
			/**
			 * parallax of object in degrees
			 */
			ParO: number,
			/**
			 * magnitude of object
			 */
			Magn: number,
			/**
			 * rise/set time of object in JD
			 */
			RiseO: number,
			/**
			 * rise/set time of Sun in JD
			 */
			RiseS: number,
			/**
			 * rise/set time of object minus rise/set time of Sun in JD
			 */
			Lag: number,
			/**
			 * visibility duration in JD
			 */
			TvisVR: number,
			/**
			 * crescent length of Moon in degrees
			 */
			LMoon: number,
			/**
			 * CVAact in degrees
			 */
			CVAact: number,
			/**
			 * Illum in percentage
			 */
			Illum: number,
			/**
			 * CVAact in degrees
			 */
			CVAact: number,
			/**
			 * MSk
			 */
			MSk: number
		]
	}

	interface Heliacal extends Flag, Error {
		/**
		 * ### Description
		 * Event times of the heliacal phenomenon  
		 * ```
		 * ```
		 */
		data: [
			/**
			 * Start visibility in JD
			 */
			vis_start: number,
			/**
			 * Optimum visibility in JD (zero if hel_flag >= SE_HELFLAG_AV)
			 */
			vis_opt: number,
			/**
			 * End of visibility in JD (zero if hel_flag >= SE_HELFLAG_AV)
			 */
			vis_end: number
		]
	}

	interface HousePosition extends Error {
		/**
		 * ### Description
		 * House position including fraction  
		 * From 1.0 to 12.999999 for normal houses and 1.0 to 36.9999999 for gauquelin sectors  
		 * ```
		 * ```
		 */
		data: number
	}

	interface Houses<T> extends Flag {
		/**
		 * ### Description
		 * Calculated positions for the houses and other points  
		 * ```
		 * ```
		 */
		data: HouseData<T>
	}

	interface HousesEx<T> extends Flag, Error {
		/**
		 * ### Description
		 * Calculated positions for the houses and other points  
		 * Also includes momentary motion speeds  
		 * ```
		 * ```
		 */
		data: HouseExData<T>
	}

	interface HouseData<T> {
		/**
		 * ### Description
		 * Longitude positions for the houses  
		 * 36 houses for gauquelin sectors, 12 houses for all other systems  
		 * ```
		 * ```
		 */
		houses: T extends 36 ? GauquelinHousesList : HousesList,
		/**
		 * ### Description
		 * Longitude positions for other points of interest in the great circles  
		 * ```
		 * ```
		 */
		points: [
			/**
			 * Longitude of the Ascendant
			 */
			asc: number,
			/**
			 * Longitude of the Midheaven
			 */
			mc: number,
			/**
			 * Right Ascension of the Midheaven
			 */
			armc: number,
			/**
			 * Longitude of the Vertex
			 */
			vertex: number,
			/**
			 * Longitude of the Equatorial Ascendant
			 */
			equasc: number,
			/**
			 * Longitude of Walter Koch's Co-Ascendant
			 */
			coasc1: number,
			/**
			 * Longitude of Michael Munkasey's Co-Ascendant
			 */
			coasc2: number,
			/**
			 * Longitude of Michael Munkasey's Polar Ascendant
			 */
			polasc: number
		]
	}

	interface HouseExData<T> extends HouseData<T> {
		/**
		 * ### Description
		 * Momentary motion speeds of the houses  
		 * ```
		 * ```
		 */
		housesSpeed: T extends 36 ? GauquelinHousesSpeeds : HousesSpeeds,
		/**
		 * ### Description
		 * Momentary motion speeds of other points of interest  
		 * ```
		 * ```
		 */
		pointsSpeed: [
			/**
			 * Momentary speed of the Ascendant
			 */
			 asc_speed: number,
			 /**
			  * Momentary speed of the Midheaven
			  */
			 mc_speed: number,
			 /**
			  * Momentary speed in Right Ascension of the Midheaven
			  */
			 armc_speed: number,
			 /**
			  * Momentary speed of the Vertex
			  */
			 vertex_speed: number,
			 /**
			  * Momentary speed of the Equatorial Ascendant
			  */
			 equasc_speed: number,
			 /**
			  * Momentary speed of Walter Koch's Co-Ascendant
			  */
			 coasc1_speed: number,
			 /**
			  * Momentary speed of Michael Munkasey's Co-Ascendant
			  */
			 coasc2_speed: number,
			 /**
			  * Momentary speed of Michael Munkasey's Polar Ascendant
			  */
			 polasc_speed: number
		]
	}

	interface LocalApparentTime extends Flag, Error {
		/**
		 * ### Description
		 * Local apparent time in julian day in universal time
		 * ```
		 * ```
		 */
		data: number
	}

	interface LocalMeanTime extends Flag, Error {
		/**
		 * ### Description
		 * Local mean time in julian day in universal time
		 * ```
		 * ```
		 */
		data: number
	}

	interface OrbitMaxMinTrueDistance extends Flag, Error {
		/**
		 * ### Description
		 * Orbital maximum and minimum possible distances
		 * ```
		 * ```
		 */
		data: {
			/**
			 * Maximum possible distance
			 */
			max: number,
			/**
			 * Minimum possible distance
			 */
			min: number,
			/**
			 * Current true distance
			 */
			true: number
		}
	}

	interface LunEclipseHow extends Flag, Error {
		/**
		 * ### Description
		 * Array of data about the lunar eclipse  
		 * ```
		 * ```
		 */
		data: [
			/**
			 * Umbral magnitude at jd
			 */
			umbral: number,
			/**
			 * Penumbral magnitude
			 */
			penumbral: number,
			/**
			 * Unused
			 */
			_: number,
			/**
			 * Unused
			 */
			_: number,
			/**
			 * Azimuth of the moon at jd
			 */
			azimuth: number,
			/**
			 * True altitude of the moon above horizon at jd
			 */
			true_altitude: number,
			/**
			 * Apparent altitude of the moon above horizon at jd
			 */
			apparent_altitude: number,
			/**
			 * Distance of the moon from opposition in degrees
			 */
			distance: number,
			/**
			 * Eclipse magnitude (same as umbral magnitude)
			 */
			mag: number,
			/**
			 * Saros series number (if available, otherwise -99999999)
			 */
			saros: number,
			/**
			 * Saros series member number (if available, otherwise -99999999)
			 */
			saros_member: number
		]
	}

	type AzaltRev = [
		/**
		 * (λ) Ecliptic longitude if SE_HOR2ECL  
		 * (α) Equatorial right ascension if SE_HOR2EQU
		 */
		lon: number,
		/**
		 * (β) Ecliptic latitude if SE_HOR2ECL  
		 * (δ) Equatorial declination if SE_HOR2EQU
		 */
		lat: number
	]

	type Azalt = [
		/**
		 * Azimuth
		 */
		az: number,
		/**
		 * True altitude
		 */
		alt: number,
		/**
		 * Apparent altitude (with refraction)
		 */
		ap: number
	]

	type CoTransSp = [
		...cotrans: CoTrans,
		/**
		 * Daily speed for lon
		 */
		lonSpd: number,
		/**
		 * Daily speed for lat
		 */
		latSpd: number,
		/**
		 * Daily speed for dist (unchanged)
		 */
		distSpd: number
	]

	type CoTrans = [
		/**
		 * (λ) Ecliptic longitude or (α) Equatorial right ascension
		 */
		lon: number,
		/**
		 * (β) Ecliptic latitude or (δ) Equatorial declination
		 */
		lat: number,
		/**
		 * Distance in AU (unchanged)
		 */
		dist: number,
	]

	type HouseSystems = "B" | "Y" | "X" | "H" | "C" | "F" | "A" | "E" | "D" | "N" | "G" | "I" | "i" | "K" | "U" | "M" | "P" | "T" | "O" | "L" | "Q" | "R" | "S" | "V" | "W";

	type HousesList = [
		/**
		 * 1st House
		 */
		house_1: number,
		/**
		 * 2nd House
		 */
		house_2: number,
		/**
		 * 3rd House
		 */
		house_3: number,
		/**
		 * 4th House
		 */
		house_4: number,
		/**
		 * 5th House
		 */
		house_5: number,
		/**
		 * 6th House
		 */
		house_6: number,
		/**
		 * 7th House
		 */
		house_7: number,
		/**
		 * 8th House
		 */
		house_8: number,
		/**
		 * 9th House
		 */
		house_9: number,
		/**
		 * 10th House
		 */
		house_10: number,
		/**
		 * 11th House
		 */
		house_11: number,
		/**
		 * 12th House
		 */
		house_12: number,
	]

	type HousesSpeeds = [
		/**
		 * Momentary speed for the 1st House
		 */
		house_1_speed: number,
		/**
		 * Momentary speed for the 2nd House
		 */
		house_2_speed: number,
		/**
		 * Momentary speed for the 3rd House
		 */
		house_3_speed: number,
		/**
		 * Momentary speed for the 4th House
		 */
		house_4_speed: number,
		/**
		 * Momentary speed for the 5th House
		 */
		house_5_speed: number,
		/**
		 * Momentary speed for the 6th House
		 */
		house_6_speed: number,
		/**
		 * Momentary speed for the 7th House
		 */
		house_7_speed: number,
		/**
		 * Momentary speed for the 8th House
		 */
		house_8_speed: number,
		/**
		 * Momentary speed for the 9th House
		 */
		house_9_speed: number,
		/**
		 * Momentary speed for the 10th House
		 */
		house_10_speed: number,
		/**
		 * Momentary speed for the 11th House
		 */
		house_11_speed: number,
		/**
		 * Momentary speed for the 12th House
		 */
		house_12_speed: number,
	]

	type GauquelinHousesList = [
		...houses: HousesList,
		/**
		 * 13th House
		 */
		house_13: number,
		/**
		 * 14th House
		 */
		house_14: number,
		/**
		 * 15th House
		 */
		house_15: number,
		/**
		 * 16th House
		 */
		house_16: number,
		/**
		 * 17th House
		 */
		house_17: number,
		/**
		 * 18th House
		 */
		house_18: number,
		/**
		 * 19th House
		 */
		house_19: number,
		/**
		 * 20th House
		 */
		house_20: number,
		/**
		 * 21th House
		 */
		house_21: number,
		/**
		 * 22th House
		 */
		house_22: number,
		/**
		 * 23th House
		 */
		house_23: number,
		/**
		 * 24th House
		 */
		house_24: number,
		/**
		 * 25th House
		 */
		house_25: number,
		/**
		 * 26th House
		 */
		house_26: number,
		/**
		 * 27th House
		 */
		house_27: number,
		/**
		 * 28th House
		 */
		house_28: number,
		/**
		 * 29th House
		 */
		house_29: number,
		/**
		 * 30th House
		 */
		house_30: number,
		/**
		 * 31th House
		 */
		house_31: number,
		/**
		 * 32th House
		 */
		house_32: number,
		/**
		 * 33th House
		 */
		house_33: number,
		/**
		 * 34th House
		 */
		house_34: number,
		/**
		 * 35th House
		 */
		house_35: number,
		/**
		 * 36th House
		 */
		house_36: number,
	]

	type GauquelinHousesSpeeds = [
		...houses: HousesSpeeds,
		/**
		 * Momentary speed for the 13th House
		 */
		house_13_speed: number,
		/**
		 * Momentary speed for the 14th House
		 */
		house_14_speed: number,
		/**
		 * Momentary speed for the 15th House
		 */
		house_15_speed: number,
		/**
		 * Momentary speed for the 16th House
		 */
		house_16_speed: number,
		/**
		 * Momentary speed for the 17th House
		 */
		house_17_speed: number,
		/**
		 * Momentary speed for the 18th House
		 */
		house_18_speed: number,
		/**
		 * Momentary speed for the 19th House
		 */
		house_19_speed: number,
		/**
		 * Momentary speed for the 20th House
		 */
		house_20_speed: number,
		/**
		 * Momentary speed for the 21th House
		 */
		house_21_speed: number,
		/**
		 * Momentary speed for the 22th House
		 */
		house_22_speed: number,
		/**
		 * Momentary speed for the 23th House
		 */
		house_23_speed: number,
		/**
		 * Momentary speed for the 24th House
		 */
		house_24_speed: number,
		/**
		 * Momentary speed for the 25th House
		 */
		house_25_speed: number,
		/**
		 * Momentary speed for the 26th House
		 */
		house_26_speed: number,
		/**
		 * Momentary speed for the 27th House
		 */
		house_27_speed: number,
		/**
		 * Momentary speed for the 28th House
		 */
		house_28_speed: number,
		/**
		 * Momentary speed for the 29th House
		 */
		house_29_speed: number,
		/**
		 * Momentary speed for the 30th House
		 */
		house_30_speed: number,
		/**
		 * Momentary speed for the 31th House
		 */
		house_31_speed: number,
		/**
		 * Momentary speed for the 32th House
		 */
		house_32_speed: number,
		/**
		 * Momentary speed for the 33th House
		 */
		house_33_speed: number,
		/**
		 * Momentary speed for the 34th House
		 */
		house_34_speed: number,
		/**
		 * Momentary speed for the 35th House
		 */
		house_35_speed: number,
		/**
		 * Momentary speed for the 36th House
		 */
		house_36_speed: number,
	]

	type DateObject = {
		/**
		 * Full year
		 */
		year: number;
		/**
		 * Month (1-12)
		 */
		month: number;
		/**
		 * Day (1-31)
		 */
		day: number;
		/**
		 * Hour (0-23)
		 */
		hour: number;
		/**
		 * Minute (0-59)
		 */
		minute: number;
		/**
		 * Second including fraction (0-59.999999)
		 */
		second: number;
	}

	/**
	 * ### Description
	 * Transform horizontal coordinates into ecliptic or equatorial coordinates based on the observer's location
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time
	 * • calc_flag: number // Calculation flag, SE_HOR2ECL or SE_HOR2EQU
	 * • geopos: Array<number> // Geographic coordinates [longitude, latitude, elevation]
	 * • xin: Array<number> // Horizontal coordinates [azimuth, true altitude]
	 * ```
	 * ### Returns
	 * ```
	 * Array<number> [
	 *   lon, // (λ) Ecliptic longitude if SE_HOR2ECL, (α) Equatorial right ascension if SE_HOR2EQU
	 *   lat // (β) Ecliptic latitude if SE_HOR2ECL, (δ) Equatorial declination if SE_HOR2EQU
	 * ]
	 * ```
	 * ### Example
	 * ```
	 * const result = azalt_rev(2314234, constants.SE_HOR2ECL, [34, 40, 0], [75, 67]);
	 * console.log(`Longitude: ${result[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function azalt_rev(tjd_ut: number, calc_flag: number, geopos: [longitude: number, latitude: number, elevation: number], xin: [azimuth: number, true_altitude: number]): AzaltRev;

	/**
	 * ### Description
	 * Transform ecliptic or equatorial coordinates into horizontal coordinates based on the observer's location
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time
	 * • calc_flag: number // Calculation flag, SE_HOR2ECL or SE_HOR2EQU
	 * • geopos: Array<number> // Geographic coordinates [longitude, latitude, elevation]
	 * • atpress: number // Atmospheric pressure in mbar/hpa
	 * • attemp: number // Atmospheric temperature in celcius
	 * • xin: Array<number> // Ecliptic or equatorial coordinates [lon/ra, lat/dec, distance]
	 * ```
	 * ### Returns
	 * ```
	 * Array<number> [
	 *   az, // Azimuth
	 *   alt, // True altitude
	 *   ap // Apparent altitude (with refraction)
	 * ]
	 * ```
	 * ### Example
	 * ```
	 * const result = azalt(2314234, constants.SE_ECL2HOR, [34, 40, 0], 0, 0, [75, 67, 0]);
	 * console.log(`Azimuth: ${result[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function azalt(tjd_ut: number, calc_flag: number, geopos: [longitude: number, latitude: number, elevation: number], atpress: number, attemp: number, xin: [lon_or_ra: number, lat_or_dec: number, distance: number]): Azalt;

	/**
	 * ### Description
	 * Compute planetocentric positions of planets as observed from a different planet, for example Jupiter-centric ephemerides
	 * ### Params
	 * ```
	 * • tjd_et: number // Julian day in terrestrial/ephemeris time
	 * • ipl: number // Target object ID
	 * • iplctr: number // Center object ID
	 * • iflag: number // Calculation flags
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // Computed flags or ERR
	 *   error: string, // Error message if ERR or if incompatible flags
	 *   data: Array<number> [
	 *     lon, // Longitude, right ascension, cartesian X, or true obliquity depending on the flags
	 *     lat, // Latitude, declination, cartesian Y, or mean obliquity depending on the flags
	 *     dist, // Distance in AU, cartesian Z or nutation in longitude depending on the flags
	 *     lonSpd, // Daily speed for lon or nutation in obliquity depending on the flags
	 *     latSpd, // Daily speed for lat
	 *     distSpd, // Daily speed for dist
	 *   ]
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
	 * const result = calc_pctr(2314234, constants.SE_EARTH, constants.SE_MARS, flags);
	 * if(result.flag === constants.ERR) throw new Error(result.error);
	 * if(result.flag !== flags) console.log(result.error);
	 * console.log(`Longitude: ${result.data[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function calc_pctr(tjd_et: number, ipl: number, iplctr: number, iflag: number): Calc;

	/**
	 * ### Description
	 * Compute positions of planets, asteroids, lunar nodes and apogees from universal time
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time
	 * • ipl: number // Target object ID
	 * • iflag: number // Calculation flags
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // Computed flags or ERR
	 *   error: string, // Error message if ERR or if incompatible flags
	 *   data: Array<number> [
	 *     lon, // Longitude, right ascension, cartesian X, or true obliquity depending on the flags
	 *     lat, // Latitude, declination, cartesian Y, or mean obliquity depending on the flags
	 *     dist, // Distance in AU, cartesian Z or nutation in longitude depending on the flags
	 *     lonSpd, // Daily speed for lon or nutation in obliquity depending on the flags
	 *     latSpd, // Daily speed for lat
	 *     distSpd, // Daily speed for dist
	 *   ]
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
	 * const result = calc_ut(2314234, constants.SE_MOON, flags);
	 * if(result.flag !== constants.OK) { throw new Error(result.error); }
	 * if(result.flag !== flags) { console.log(result.error); }
	 * console.log(`Longitude: ${result.data[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function calc_ut(tjd_ut: number, ipl: number, iflag: number): Calc;

	/**
	 * ### Description
	 * Compute positions of planets, asteroids, lunar nodes and apogees from ephemeris time
	 * ### Params
	 * ```
	 * • tjd_et: number // Julian day in terrestrial/ephemeris time
	 * • ipl: number // Target object ID
	 * • iflag: number // Calculation flags
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // Computed flags or ERR
	 *   error: string, // Error message if ERR or if incompatible flags
	 *   data: Array<number> [
	 *     lon, // Longitude, right ascension, cartesian X, or true obliquity depending on the flags
	 *     lat, // Latitude, declination, cartesian Y, or mean obliquity depending on the flags
	 *     dist, // Distance in AU, cartesian Z or nutation in longitude depending on the flags
	 *     lonSpd, // Daily speed for lon or nutation in obliquity depending on the flags
	 *     latSpd, // Daily speed for lat
	 *     distSpd, // Daily speed for dist
	 *   ]
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
	 * const result = calc(2314234, constants.SE_VENUS, flags);
	 * if(result.flag === constants.ERR) { throw new Error(result.error); }
	 * if(result.flag !== flags) { console.log(result.error); }
	 * console.log(`Longitude: ${result.data[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function calc(tjd_et: number, ipl: number, iflag: number): Calc;
	
	/**
	 * ### Description
	 * Reset swisseph internals and cleanup file handles  
	 * Not usually required as Node cleans after itself
	 * ### Example
	 * ```
	 * close();
	 * ```
	 * &nbsp;
	 */
	export function close(): void;

	/**
	 * ### Description
	 * Transform between ecliptic and equatorial coordinate systems including motion speeds  
	 * From equatorial to ecliptic, obliquity must be positive  
	 * From ecliptic to equatorial, obliquity must be negative  
	 * Distances are not affected and can be 0
	 * ### Params
	 * ```
	 * • xpo: Array<number> // Input coordinates in ecliptic or equatorial coordinates [lon, lat, dist, lonSpd, latSpd, distSpd]
	 * • eps: number // Positive or negative obliquity of the ecliptic
	 * ```
	 * ### Returns
	 * ```
	 * Array<number> [
	 *   lon, // (λ) Ecliptic longitude or (α) Equatorial right ascension
	 *   lat // (β) Ecliptic latitude or (δ) Equatorial declination
	 *   dist, // Distance in AU (unchanged)
	 *   lonSpd, // Daily speed for lon
	 *   latSpd, // Daily speed for lat
	 *   distSpd, // Daily speed for dist (unchanged)
	 * ]
	 * ```
	 * ### Example
	 * ```
	 * const obliquity = calc(2314234, constants.SE_ECL_NUT, constants.SEFLG_SWIEPH).data[0];
	 * const result = cotrans_sp([345, 10, 0, 1.5, 0.01, 0], -obliquity);
	 * console.log(`Right Ascension: ${result[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function cotrans_sp(xpo: [lon: number, lat: number, dist: number, lonSpd: number, latSpd: number, distSpd: number], eps: number): CoTransSp;

	/**
	 * ### Description
	 * Transform between ecliptic and equatorial coordinate systems  
	 * From equatorial to ecliptic, obliquity must be positive  
	 * From ecliptic to equatorial, obliquity must be negative  
	 * Distance is not affected and can be 0
	 * ### Params
	 * ```
	 * • xpo: Array<number> // Input coordinates in ecliptic or equatorial coordinates [lon, lat, dist]
	 * • eps: number // Positive or negative obliquity of the ecliptic
	 * ```
	 * ### Returns
	 * ```
	 * Array<number> [
	 *   lon, // Longitude or right ascension
	 *   lat, // Latitude or declination
	 *   dist, // Distance in AU (unchanged)
	 * ]
	 * ```
	 * ### Example
	 * ```
	 * const obliquity = calc(2314234, constants.SE_ECL_NUT, constants.SEFLG_SWIEPH).data[0];
	 * const result = cotrans([345, 10, 0], -obliquity);
	 * console.log(`Right Ascension: ${result[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function cotrans(xpo: [lon: number, lat: number, dist: number], eps: number): CoTrans;

	/**
	 * ### Description
	 * Convert centiseconds to degrees string
	 * ### Params
	 * ```
	 * • csec: number // Centiseconds value
	 * ```
	 * ### Returns
	 * ```
	 * string
	 * ```
	 * ### Example
	 * ```
	 * const deg = cs2degstr(2345464); // " 6°30'54"
	 * ```
	 * &nbsp;
	 */
	export function cs2degstr(csec: number): string;

	/**
	 * ### Description
	 * Convert centiseconds to longitude or latitude string with user defined sign character
	 * ### Params
	 * ```
	 * • csec: number // Centiseconds value
	 * • pchar: string // Sign character for positive values
	 * • mchar: string // Sign character for negative values
	 * ```
	 * ### Returns
	 * ```
	 * string
	 * ```
	 * ### Example
	 * ```
	 * const lon = cs2lonlatstr(2345464, "+", "-"); // "6+30'55"
	 * ```
	 * &nbsp;
	 */
	export function cs2lonlatstr(csec: number, pchar: string, mchar: string): string;

	/**
	 * ### Description
	 * Convert centiseconds to time string
	 * ### Params
	 * ```
	 * • csec: number // Centiseconds value
	 * • sep: string // Separator character
	 * • supzero: boolean // Omit seconds if they are zero
	 * ```
	 * ### Returns
	 * ```
	 * string
	 * ```
	 * ### Example
	 * ```
	 * const time = cs2timestr(2345464, ":", true); // "6:30:55"
	 * ```
	 * &nbsp;
	 */
	export function cs2timestr(csec: number, sep: string, supzero: boolean): string;

	/**
	 * ### Description
	 * Normalize centiseconds to 360 degrees range
	 * ### Params
	 * ```
	 * • csec: number // Centiseconds value
	 * ```
	 * ### Returns
	 * ```
	 * number
	 * ```
	 * ### Example
	 * ```
	 * const cs = csnorm(234546424235); // 8022955
	 * ```
	 * &nbsp;
	 */
	export function csnorm(csec: number): number;

	/**
	 * ### Description
	 * Round centiseconds to nearest second
	 * ### Params
	 * ```
	 * • csec: number // Centiseconds value
	 * ```
	 * ### Returns
	 * ```
	 * number
	 * ```
	 * ### Example
	 * ```
	 * const cs = csroundsec(14235235); // 14235200
	 * ```
	 * &nbsp;
	 */
	export function csroundsec(csec: number): number;

	/**
	 * ### Description
	 * Round double precision value to long integer
	 * ### Params
	 * ```
	 * • double: number // Double value
	 * ```
	 * ### Returns
	 * ```
	 * number
	 * ```
	 * ### Example
	 * ```
	 * const long = d2l(546546.7868); // 546547
	 * ```
	 * &nbsp;
	 */
	export function d2l(double: number): number;

	/**
	 * ### Description
	 * Calculate julian day and check if the date is valid
	 * ### Params
	 * ```
	 * • year: number // Full year
	 * • month: number // Month (1-12)
	 * • day: number // Day (1-31)
	 * • hour: number // Hour with decimal fraction (0-23.999)
	 * • calendar: string // Calendar system, 'g' for gregorian calendar, 'j' for julian calendar
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   data: number // Julian day value
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const jd = date_conversion(1995, 5, 15, 13.75, "g");
	 * if(jd.flag !== constants.OK) { throw new Error("Invalid date"); }
	 * console.log(`Julian Day: ${jd.data}`);
	 * ```
	 * &nbsp;
	 */
	export function date_conversion(year: number, month: number, day: number, hour: number, calendar: string): DateConversion;

	/**
	 * ### Description
	 * Find which day of the week a particular date is.  
	 * ### Params
	 * ```
	 * • jd: number // Julian day value in universal time
	 * ```
	 * ### Returns
	 * ```
	 * number // 0 = monday, ... 6 = sunday;
	 * ```
	 * ### Example
	 * ```
	 * const day = day_of_week(2459311); // 1 (tuesday)
	 * ```
	 * &nbsp;
	 */
	export function day_of_week(jd: number): number;

	/**
	 * ### Description
	 * Normalize degree value to 0-360 range
	 * ### Params
	 * ```
	 * • deg: number // degree value
	 * ```
	 * ### Returns
	 * ```
	 * number // Normalized degree value;
	 * ```
	 * ### Example
	 * ```
	 * const deg = degnorm(523.546); // 163.546
	 * ```
	 * &nbsp;
	 */
	export function degnorm(deg: number): number;

	/**
	 * ### Description
	 * Obtain the Delta T value for a date using a particular ephemeris system
	 * ### Params
	 * ```
	 * • tjd: number // Julian day value in Universal Time
	 * • ephe: number // Ephemeris flag (SEFLG_SWIEPH, SEFLG_JPLEPH or SEFLG_MOSEPH)
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   error: string // Warning message if any
	 *   data: number // Delta T value
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const deltaT = deltat_ex(2431232, constants.SEFLG_MOSEPH); // 0.00032552915335235926
	 * ```
	 * &nbsp;
	 */
	export function deltat_ex(tjd: number, ephe: number): DeltaT;

	/**
	 * ### Description
	 * Obtain the Delta T value for a particular date
	 * ### Params
	 * ```
	 * • tjd: number // Julian day value in Universal Time
	 * ```
	 * ### Returns
	 * ```
	 * number // Delta T value
	 * ```
	 * ### Example
	 * ```
	 * const deltaT = deltat(2431232); // 0.00032554160173271644
	 * ```
	 * &nbsp;
	 */
	export function deltat(tjd: number): number;

	/**
	 * ### Description
	 * Arc distance between two points in centiseconds
	 * ### Params
	 * ```
	 * • csec1: number // First point in centiseconds
	 * • csec2: number // Second point in centiseconds
	 * ```
	 * ### Returns
	 * ```
	 * number // Distance in centiseconds from -64800000 to 64800000 (negative if second point is ahead of the first)
	 * ```
	 * ### Example
	 * ```
	 * const distance = difcs2n(155, 160); // -5
	 * ```
	 * &nbsp;
	 */
	export function difcs2n(csec1: number, csec2: number): number;

	/**
	 * ### Description
	 * Arc distance between two points in centiseconds in a single direction
	 * ### Params
	 * ```
	 * • csec1: number // First point in centiseconds
	 * • csec2: number // Second point in centiseconds
	 * ```
	 * ### Returns
	 * ```
	 * number // Distance in centiseconds from 0 to 129600000
	 * ```
	 * ### Example
	 * ```
	 * const distance = difcsn(155, 160); // 129599995
	 * ```
	 * &nbsp;
	 */
	export function difcsn(csec1: number, csec2: number): number;

	/**
	 * ### Description
	 * Arc distance between two points in degrees
	 * ### Params
	 * ```
	 * • deg1: number // First point in degrees
	 * • deg2: number // Second point in degrees
	 * ```
	 * ### Returns
	 * ```
	 * number // Distance in degrees from -180 to 180 (negative if second point is ahead of the first)
	 * ```
	 * ### Example
	 * ```
	 * const distance = difdeg2n(120, 130); // -10
	 * ```
	 * &nbsp;
	 */
	export function difdeg2n(deg1: number, deg2: number): number;

	/**
	 * ### Description
	 * Arc distance between two points in degrees in a single direction
	 * ### Params
	 * ```
	 * • deg1: number // First point in degrees
	 * • deg2: number // Second point in degrees
	 * ```
	 * ### Returns
	 * ```
	 * number // Distance in degrees from 0 to 360
	 * ```
	 * ### Example
	 * ```
	 * const distance = difdeg2n(120, 130); // 350
	 * ```
	 * &nbsp;
	 */
	export function difdegn(deg1: number, deg2: number): number;

	/**
	 * ### Description
	 * Get the visual magnitude (brightness) of a fixed star
	 * ### Params
	 * ```
	 * • star: string // Name of the star to search for in the sefstars.txt file
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message in case of ERR
	 *   name: string, // The name of the matched star from the sefstars.txt file
	 *   data: number // The star's magnitude value
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = fixStar_mag("Aldebaran");
	 * if(result.flag !== constants.OK) { throw new Error(result.error); }
	 * console.log(`
	 *   Star: ${result.name}
	 *   Magnitude: ${result.data}
	 * `)
	 * ```
	 * &nbsp;
	 */
	export function fixstar_mag(star: string): FixStarMag;

	/**
	 * ### Description
	 * Calculate the positions of a star from universal time
	 * ### Params
	 * ```
	 * • star: string // Name of the star to search for in the sefstars.txt file
	 * • tjd_ut: number // Julian day in universal time
	 * • iflag: number // Calculation flags
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message in case of ERR
	 *   name: string, // The name of the matched star from the sefstars.txt file
	 *   data: Array<number> [
	 *     lon, // Longitude, right ascension or cartesian X
	 *     lat, // Latitude, declination or cartesian Y
	 *     dist, // Distance in AU or cartesian Z
	 *     lonSpd, // Daily speed for lon
	 *     latSpd, // Daily speed for lat
	 *     distSpd, // Daily speed for dist
	 *   ]
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
	 * const result = fixstar_ut("Aldebaran", 2413256, flags);
	 * if(result.flag === constants.ERR) { throw new Error(result.error); }
	 * if(result.flag !== flags) { console.log(result.error); }
	 * console.log(`
	 *   Name: ${result.name}
	 *   Longitude: ${result.data[0]}
	 * `);
	 * ```
	 * &nbsp;
	 */
	export function fixstar_ut(star: string, tjd_ut: number, iflag: number): FixStar;

	/**
	 * ### Description
	 * Calculate the positions of a star from ephemeris/terrestrial time
	 * ### Params
	 * ```
	 * • star: string // Name of the star to search for in the sefstars.txt file
	 * • tjd_et: number // Julian day in ephemeris/terrestrial time
	 * • iflag: number // Calculation flags
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message in case of ERR
	 *   name: string, // The name of the matched star from the sefstars.txt file
	 *   data: Array<number> [
	 *     lon, // Longitude, right ascension or cartesian X
	 *     lat, // Latitude, declination or cartesian Y
	 *     dist, // Distance in AU or cartesian Z
	 *     lonSpd, // Daily speed for lon
	 *     latSpd, // Daily speed for lat
	 *     distSpd, // Daily speed for dist
	 *   ]
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
	 * const result = fixstar("Aldebaran", 2413256, flags);
	 * if(result.flag === constants.ERR) { throw new Error(result.error); }
	 * if(result.flag !== flags) { console.log(result.error); }
	 * console.log(`
	 *   Name: ${result.name}
	 *   Longitude: ${result.data[0]}
	 * `);
	 * ```
	 * &nbsp;
	 */
	export function fixstar(star: string, tjd_et: number, iflag: number): FixStar;

	/**
	 * ### Description
	 * Get the visual magnitude (brightness) of a fixed star
	 * ### Params
	 * ```
	 * • star: string // Name of the star to search for in the sefstars.txt file
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message in case of ERR
	 *   name: string, // The name of the matched star from the sefstars.txt file
	 *   data: number // The star's magnitude value
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = fixStar2_mag("Aldebaran");
	 * if(result.flag !== constants.OK) { throw new Error(result.error); }
	 * console.log(`
	 *   Star: ${result.name}
	 *   Magnitude: ${result.data}
	 * `)
	 * ```
	 * &nbsp;
	 */
	export function fixstar2_mag(star: string): FixStarMag;

	/**
	 * ### Description
	 * Calculate the positions of a star from universal time
	 * ### Params
	 * ```
	 * • star: string // Name of the star to search for in the sefstars.txt file
	 * • tjd_ut: number // Julian day in universal time
	 * • iflag: number // Calculation flags
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message in case of ERR
	 *   name: string, // The name of the matched star from the sefstars.txt file
	 *   data: Array<number> [
	 *     lon, // Longitude, right ascension or cartesian X
	 *     lat, // Latitude, declination or cartesian Y
	 *     dist, // Distance in AU or cartesian Z
	 *     lonSpd, // Daily speed for lon
	 *     latSpd, // Daily speed for lat
	 *     distSpd, // Daily speed for dist
	 *   ]
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
	 * const result = fixstar2_ut("Aldebaran", 2413256, flags);
	 * if(result.flag === constants.ERR) { throw new Error(result.error); }
	 * if(result.flag !== flags) { console.log(result.error); }
	 * console.log(`
	 *   Name: ${result.name}
	 *   Longitude: ${result.data[0]}
	 * `);
	 * ```
	 * &nbsp;
	 */
	export function fixstar2_ut(star: string, tjd_ut: number, iflag: number): FixStar;

	/**
	 * ### Description
	 * Calculate the positions of a star from ephemeris/terrestrial time
	 * ### Params
	 * ```
	 * • star: string // Name of the star to search for in the sefstars.txt file
	 * • tjd_et: number // Julian day in ephemeris/terrestrial time
	 * • iflag: number // Calculation flags
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message in case of ERR
	 *   name: string, // The name of the matched star from the sefstars.txt file
	 *   data: Array<number> [
	 *     lon, // Longitude, right ascension or cartesian X
	 *     lat, // Latitude, declination or cartesian Y
	 *     dist, // Distance in AU or cartesian Z
	 *     lonSpd, // Daily speed for lon
	 *     latSpd, // Daily speed for lat
	 *     distSpd, // Daily speed for dist
	 *   ]
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
	 * const result = fixstar2("Aldebaran", 2413256, flags);
	 * if(result.flag === constants.ERR) { throw new Error(result.error); }
	 * if(result.flag !== flags) { console.log(result.error); }
	 * console.log(`
	 *   Name: ${result.name}
	 *   Longitude: ${result.data[0]}
	 * `);
	 * ```
	 * &nbsp;
	 */
	export function fixstar2(star: string, tjd_et: number, iflag: number): FixStar;

	/**
	 * 
	 * @param tjd_ut 
	 * @param ipl 
	 * @param starname 
	 * @param iflag 
	 * @param imeth 
	 * @param geopos 
	 * @param atpress 
	 * @param attemp 
	 */

	/**
	 * ### Description
	 * Calculate the Gauquelin Sector position of an object
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time time
	 * • ipl: number // Object ID (This is ignored if starname is not null)
	 * • starname: string | null // Star name if star
	 * • iflag: number // Calculation flags
	 * • imeth: number // Gauquelin sector calculation method
	 * • geopos: Array<number> // Geographic coordinates [longitude, latitude, elevation]
	 * • atpress: number // Atmospheric pressure in mbar/hpa
	 * • attemp: number // Atmospheric temperature in celcius
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message in case of ERR or other warnings
	 *   data: number // The gauquelin sector with fraction
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = gauquelin_sector(2413256, constants.SE_MOON, null, constants.SEFLG_SWIEPH, 0, [15,10,0], 0, 0);
	 * if(result.flag !== constants.OK) { throw new Error(result.error); }
	 * if(result.error) { console.log(result.error); }
	 * console.log(`Sector: ${Math.floor(result.data)}`);
	 * ```
	 * &nbsp;
	 */
	export function gauquelin_sector(tjd_ut: number, ipl: number, starname: string | null, iflag: number, imeth: number, geopos: [number,number,number], atpress: number, attemp: number): GauquelinSector;

	/**
	 * ### Description
	 * Get Ayanamsa value from universal time with nutation
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time
	 * • ephe_flag: number // Ephemeris flag
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // Computed ephemeris flag or ERR
	 *   error: string, // Error message if ERR
	 *   data: number // Ayanamsa value
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = get_ayanamsa_ex_ut(2314234, constants.SEFLG_SWIEPH);
	 * if(result.flag !== constants.OK) { console.log(result.error); }
	 * ```
	 * &nbsp;
	 */
	export function get_ayanamsa_ex_ut(tjd_ut: number, ephe_flag: number): Ayanamsa;

	/**
	 * ### Description
	 * Get Ayanamsa value from ephemeris/terrestrial time with nutation
	 * ### Params
	 * ```
	 * • tjd_et: number // Julian day in ephemeris/terrestrial time
	 * • ephe_flag: number // Ephemeris flag
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // Computed ephemeris flag or ERR
	 *   error: string, // Error message if ERR
	 *   data: number // Ayanamsa value
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = get_ayanamsa_ex(2314234, constants.SEFLG_SWIEPH);
	 * if(result.flag !== constants.OK) { console.log(result.error); }
	 * ```
	 * &nbsp;
	 */
	export function get_ayanamsa_ex(tjd_et: number, ephe_flag: number): Ayanamsa;

	/**
	 * ### Description
	 * Get name of predefined ayanamsa ID
	 * ### Params
	 * ```
	 * • aya: number // Predefined ayanamsa ID
	 * ```
	 * ### Returns
	 * ```
	 * string // Ayanamsa name
	 * ```
	 * ### Example
	 * ```
	 * const sidname = get_ayanamsa_name(constants.SE_SIDM_LAHIRI); // "Lahiri"
	 * ```
	 * &nbsp;
	 */
	export function get_ayanamsa_name(aya: number): string;

	/**
	 * ### Description
	 * Get ayanamsa value from universal time without nutation
	 * ### Params
	 * ```
	 * • tjd_et: number // Julian day in universal time
	 * ```
	 * ### Returns
	 * ```
	 * number // Ayanamsa value for given date
	 * ```
	 * ### Example
	 * ```
	 * const ayan = get_ayanamsa_ut(2314234); // 19.493219647880473
	 * ```
	 * &nbsp;
	 */
	export function get_ayanamsa_ut(tjd_ut: number): number;

	/**
	 * ### Description
	 * Get ayanamsa value from ephemeris time without nutation
	 * ### Params
	 * ```
	 * • tjd_et: number // Julian day in ephemeris/terrestrial time
	 * ```
	 * ### Returns
	 * ```
	 * number // Ayanamsa value for given date
	 * ```
	 * ### Example
	 * ```
	 * const ayan = get_ayanamsa(2314234); // 19.493219620078364
	 * ```
	 * &nbsp;
	 */
	export function get_ayanamsa(tjd_et: number): number;

	/**
	 * ### Description
	 * Get information from the last used ephemeris file
	 * ### Params
	 * ```
	 * • ifno: number // file type
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   path: string, // Path to ephemeris file
	 *   start: number, // Ephemeris start date
	 *   end: number, // Ephemeris end date
	 *   denum: number // JPL version used to generate the file
	 * }
	 * ```
	 * ### Example
	 * ```
	 * // call calc to load the ephemeris file
	 * calc(2342342, constants.SE_VENUS, constants.SEFLG_SWIEPH);
	 * const fileinfo = get_current_file_data(0);
	 * ```
	 * &nbsp;
	 */
	export function get_current_file_data(ifno: number): GetCurrentFileData;

	/**
	 * ### Description
	 * Get library path  
	 * Returns the location of the node executable
	 * ### Returns
	 * ```
	 * string // Library path
	 * ```
	 * ### Example
	 * ```
	 * const path = get_library_path();
	 * ```
	 * &nbsp;
	 */
	export function get_library_path(): string;

	/**
	 * ### Description
	 * Get an object's orbital elements for a given date in ephemeris/terrestrial time
	 * ### Params
	 * ```
	 * • tjd_et: number // Julian day in ephemeris/terrestrial time
	 * • ipl: number // Object ID
	 * • iflag: number // Calculation flags
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message if ERR
	 *   data: number [
	 *     a, // Semimajor axis
	 *     e, // Eccentricity
	 *     i, // Inclination
	 *     Ω, // Longitude of ascending node
	 *     ω, // Argument of periapsis
	 *     ϖ, // Longitude of periapsis
	 *     M0, // Mean anomaly at epoch
	 *     ν0, // True anomaly at epoch
	 *     E0, // Eccentric anomaly at epoch
	 *     L0, // Mean longitude at epoch
	 *     sidereal_period, // Sidereal orbital period in tropical years
	 *     daily_motion, // Mean daily motion
	 *     tropical_period, // Tropical period in years
	 *     synodic_period, // Synodic period in days
	 *     perihelion_passage, // Time of perihelion passage
	 *     perihelion_distance, // Perihelion distance
	 *     aphelion_distance // Aphelion distance
	 *   ]
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = get_orbital_elements(2314234, constants.SE_MARS, constants.SEFLG_SWIEPH);
	 * if(result.flag !== constants.OK) { console.log(result.error); }
	 * ```
	 * &nbsp;
	 */
	export function get_orbital_elements(tjd_et: number, ipl: number, iflag: number): GetOrbitalElements

	/**
	 * ### Description
	 * Get an object's name
	 * ### Params
	 * ```
	 * • ipl: number // Object ID
	 * ```
	 * ### Returns
	 * ```
	 * string // Object's name
	 * ```
	 * ### Example
	 * ```
	 * const name = get_planet_name(constants.SE_PLUTO); // "Pluto"
	 * ```
	 * &nbsp;
	 */
	export function get_planet_name(ipl: number): string;

	/**
	 * ### Description
	 * Get internal tidal acceleration value
	 * ### Returns
	 * ```
	 * number // Tidal acceleration
	 * ```
	 * ### Example
	 * ```
	 * const tidacc = get_tid_acc();
	 * ```
	 * &nbsp;
	 */
	export function get_tid_acc(): number;

	/**
	 * ### Description
	 * Obtain additional data used for calculation of heliacal risings and settings
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time
	 * • dgeo: Array<number> // Geographic coordinates [longitude, latitude, elevation]
	 * • datm: Array<number> // Atmospheric conditions [pressure, temperature, humidity, meteorological range]
	 * • dobs: Array<number> // Observer description [age, sellen ratio, optical type, optical magnification, optical aperture, optical transmission]
	 * • object_name: string // Name of fixed star or planet
	 * • event_type: number // Event type
	 * • hel_flag: number // Calculation flag
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message if ERR
	 *   data: number [
	 *     AltO, // topocentric altitude of object in degrees (unrefracted)
	 *     AppAltO, // apparent altitude of object in degrees (refracted)
	 *     GeoAltO, // geocentric altitude of object in degrees
	 *     AziO, // azimuth of object in degrees
	 *     AltS, // topocentric altitude of Sun in degrees
	 *     AziS, // azimuth of Sun in degrees
	 *     TAVact, // actual topocentric arcus visionis in degrees
	 *     ARCVact, // actual (geocentric) arcus visionis in degrees
	 *     DAZact, // actual difference between object's and sun's azimuth in degrees
	 *     ARCLact, // actual longitude difference between object and sun in degrees
	 *     kact, // extinction coefficient
	 *     minTAV, // smallest topocentric arcus visionis in degrees
	 *     TfistVR, // first time object is visible, according to VR in JD
	 *     TbVR, // optimum time the object is visible, according to VR in JD
	 *     TlastVR, // last time object is visible, according to VR in JD
	 *     TbYallop, // best time the object is visible, according to Yallop in JD
	 *     WMoon, // crescent width of Moon in degrees
	 *     qYal, // q-test value of Yallop
	 *     qCrit, // q-test criterion of Yallop
	 *     ParO, // parallax of object in degrees
	 *     Magn, // magnitude of object
	 *     RiseO, // rise/set time of object in JD
	 *     RiseS, // rise/set time of Sun in JD
	 *     Lag, // rise/set time of object minus rise/set time of Sun in JD
	 *     TvisVR, // visibility duration in JD
	 *     LMoon, //  crescent length of Moon in degrees
	 *     CVAact, // CVAact in degrees
	 *     Illum, // Illum in percentage
	 *     CVAact, // CVAact in degrees
	 *     MSk // MSk
	 *   ]
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = heliacal_pheno_ut(2415362, [8,47,900], [1000,10,50,-0.15], [21,0,0,0,0,0], "moon", 0, 0);
	 * if(result.flag !== constants.OK) { console.log(result.error); }
	 * console.log(result.data);
	 * ```
	 * &nbsp;
	 */
	export function heliacal_pheno_ut(tjd_ut: number, dgeo: [longitude: number, latitude: number, elevation: number], datm: [pressure: number, temperature: number, humidity: number, meteorological_range: number], dobs: [age: number, sellen_ratio: number, optical_type: number, optical_magnification: number, optical_aperture: number, optical_transmission: number], object_name: string, event_type: number, hel_flag: number): HeliacalPheno;

	/**
	 * ### Description
	 * Calculate the next heliacal phenomenon after a given start date  
	 * It works between geographic latitudes -60 and 60
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time
	 * • dgeo: Array<number> // Geographic coordinates [longitude, latitude, elevation]
	 * • datm: Array<number> // Atmospheric conditions [pressure, temperature, humidity, meteorological range]
	 * • dobs: Array<number> // Observer description [age, sellen ratio, optical type, optical magnification, optical aperture, optical transmission]
	 * • object_name: string // Name of fixed star or planet
	 * • event_type: number // Event type
	 * • hel_flag: number // Calculation flag
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message if ERR
	 *   data: number [
	 *     vis_start, // Start visibility in JD
	 *     vis_opt, // Optimum visibility in JD (zero if hel_flag >= SE_HELFLAG_AV)
	 *     vis_end // End of visibility in JD (zero if hel_flag >= SE_HELFLAG_AV)
	 *   ]
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = heliacal_ut(2415362, [8,47,900], [1000,10,50,-0.15], [21,0,0,0,0,0], "venus", 0, 0);
	 * if(result.flag !== constants.OK) { console.log(result.error); }
	 * console.log(`Visibility Start: ${result.data[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function heliacal_ut(tjd_ut: number,	dgeo: [longitude: number, latitude: number, elevation: number],	datm: [pressure: number, temperature: number, humidity: number, meteorological_range: number], dobs: [age: number, sellen_ratio: number, optical_type: number, optical_magnification: number, optical_aperture: number, optical_transmission: number], object_name: string,	event_type: number,	hel_flag: number): Heliacal;

	/**
	 * ### Description
	 * Get the name of a house system
	 * ### Params
	 * ```
	 * • hsys: string // House system ID
	 * ```
	 * ### Returns
	 * ```
	 * string // House system name
	 * ```
	 * ### Example
	 * ```
	 * const name = house_name("p"); // "Placidus"
	 * ```
	 * &nbsp;
	 */
	export function house_name(hsys: number): string;

	/**
	 * ### Description
	 * Calculate the house position of an object  
	 * This function attempts to obtain a visually accurate house position by also taking latitude/declination into account
	 * ### Params
	 * ```
	 * • armc: number // Right ascension
	 * • geolat: number // Geographic latitude
	 * • eps: number // Obliquity of the ecliptic
	 * • hsys: string // House system ID
	 * • xpin: Array<number> // Object position in ecliptic tropical coordinates [longitude, latitude]
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   error: string, // Error message if any
	 *   data: number // House position including fraction
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = house_pos(50, 45, 23, "p", [256, 2]);
	 * if(result.error) { throw new Error(result.error); }
	 * console.log(`House: ${Math.floor(result.data)}`);
	 * ```
	 * &nbsp;
	 */
	export function house_pos(armc: number, geolat: number, eps: number, hsys: string, xpin: [longitude: number, latitude: number]): HousePosition;

	/**
	 * ### Description
	 * Calculate houses and other points from right ascension and obliquity including momentary motion speeds  
	 * This function can be used to calculate houses without a date, such as composite houses  
	 * It also returns an error message in case something goes wrong
	 * ### Params
	 * ```
	 * • armc: number // Right ascension of the midheaven
	 * • geolat: number // Geographic latitude
	 * • eps: number // Obliquity of the ecliptic
	 * • hsys: string // House system ID
	 * • decl?: number // Declination of the Sun (sunshine/makransky houses only)
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message in case of ERR
	 *   data: Object {
	 *     houses: Array<number> [
	 *       house_1: number, // Longitude of the first house
	 *       house_2: number, // Longitude of the second house
	 *       house_3: number, // Longitude of the third house
	 *       ... // 36 houses if gauquelin sectors, 12 houses otherwise
	 *     ],
	 *     points: Array<number> [
	 *       asc: number, // Ascendant
	 *       mc: number, // Midheaven
	 *       armc: number, // Right Ascension of the midheaven
	 *       vertex: number, // Vertex
	 *       equasc: number, // Equatorial Ascendant
	 *       coasc1: number, // Co-Ascendant (Walter Koch)
	 *       coasc2: number, // Co-Ascendant (Michael Munkasey)
	 *       polasc: number, // Polar Ascendant (Michael Munkasey)
	 *     ],
	 *     housesSpeed: Array<number> [
	 *       ... // Longitude speeds for the houses
	 *     ],
	 *     pointsSpeed: Array<number> [
	 *       ... // Longitude speeds for the points
	 *     ]
	 *   }
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = houses_armc_ex2(34, 10, 23, "P");
	 * if(result.flag !== constants.OK) { console.log(result.error); }
	 * console.log(`Ascendant: ${result.data.points[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function houses_armc_ex2(armc: number, geolat: number, eps: number, hsys: HouseSystems, decl?: number): HousesEx<12>;
	export function houses_armc_ex2(armc: number, geolat: number, eps: number, hsys: "G", decl?: number): HousesEx<36>;

	/**
	 * ### Description
	 * Calculate houses and other points from right ascension and obliquity  
	 * This function can be used to calculate houses without a date, such as composite houses
	 * ### Params
	 * ```
	 * • armc: number // Right ascension of the midheaven
	 * • geolat: number // Geographic latitude
	 * • eps: number // Obliquity of the ecliptic
	 * • hsys: string // House system ID
	 * • decl?: number // Declination of the Sun (sunshine/makransky houses only)
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   data: Object {
	 *     houses: Array<number> [
	 *       house_1: number, // Longitude of the first house
	 *       house_2: number, // Longitude of the second house
	 *       house_3: number, // Longitude of the third house
	 *       ... // 36 houses if gauquelin sectors, 12 houses otherwise
	 *     ],
	 *     points: Array<number> [
	 *       asc: number, // Ascendant
	 *       mc: number, // Midheaven
	 *       armc: number, // Right Ascension of the midheaven
	 *       vertex: number, // Vertex
	 *       equasc: number, // Equatorial Ascendant
	 *       coasc1: number, // Co-Ascendant (Walter Koch)
	 *       coasc2: number, // Co-Ascendant (Michael Munkasey)
	 *       polasc: number, // Polar Ascendant (Michael Munkasey)
	 *     ]
	 *   }
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = houses_armc(34, 10, 23, "P");
	 * if(result.flag !== constants.OK) { console.log("something went wrong, check output") }
	 * console.log(`Ascendant: ${result.data.points[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function houses_armc(armc: number, geolat: number, eps: number, hsys: HouseSystems, decl?: number): Houses<12>;
	export function houses_armc(armc: number, geolat: number, eps: number, hsys: "G", decl?: number): Houses<36>;

	/**
	 * ### Description
	 * Calculate houses and other points with support for calculation flags
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time
	 * • iflag: number // Calculation flags
	 * • geolat: number // Geographic latitude
	 * • geolon: number // Geographic longitude
	 * • hsys: string // House system ID
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   data: Object {
	 *     houses: Array<number> [
	 *       house_1: number, // Longitude of the first house
	 *       house_2: number, // Longitude of the second house
	 *       house_3: number, // Longitude of the third house
	 *       ... // 36 houses if gauquelin sectors, 12 houses otherwise
	 *     ],
	 *     points: Array<number> [
	 *       asc: number, // Ascendant
	 *       mc: number, // Midheaven
	 *       armc: number, // Right Ascension of the midheaven
	 *       vertex: number, // Vertex
	 *       equasc: number, // Equatorial Ascendant
	 *       coasc1: number, // Co-Ascendant (Walter Koch)
	 *       coasc2: number, // Co-Ascendant (Michael Munkasey)
	 *       polasc: number, // Polar Ascendant (Michael Munkasey)
	 *     ]
	 *   }
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = houses_ex(2413654, 0, 35.234, 45.324, "P");
	 * if(result.flag !== constants.OK) { console.log("something went wrong, check output") }
	 * console.log(`Ascendant: ${result.data.points[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function houses_ex(tjd_ut: number, iflag: number, geolat: number, geolon: number, hsys: HouseSystems): Houses<12>;
	export function houses_ex(tjd_ut: number, iflag: number, geolat: number, geolon: number, hsys: "G"): Houses<36>;

	/**
	 * ### Description
	 * Calculate the houses and other points with support for calculation flags and including momentary motion speeds  
	 * This function also outputs an error message in case something goes wrong
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time
	 * • iflag: number // Calculation flags
	 * • geolat: number // Geographic latitude
	 * • geolon: number // Geographic longitude
	 * • hsys: string // House system ID
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message in case of ERR
	 *   data: Object {
	 *     houses: Array<number> [
	 *       house_1: number, // Longitude of the first house
	 *       house_2: number, // Longitude of the second house
	 *       house_3: number, // Longitude of the third house
	 *       ... // 36 houses if gauquelin sectors, 12 houses otherwise
	 *     ],
	 *     points: Array<number> [
	 *       asc: number, // Ascendant
	 *       mc: number, // Midheaven
	 *       armc: number, // Right Ascension of the midheaven
	 *       vertex: number, // Vertex
	 *       equasc: number, // Equatorial Ascendant
	 *       coasc1: number, // Co-Ascendant (Walter Koch)
	 *       coasc2: number, // Co-Ascendant (Michael Munkasey)
	 *       polasc: number, // Polar Ascendant (Michael Munkasey)
	 *     ],
	 *     housesSpeed: Array<number> [
	 *       ... // Longitude speeds for the houses
	 *     ],
	 *     pointsSpeed: Array<number> [
	 *       ... // Longitude speeds for the points
	 *     ]
	 *   }
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = houses_ex2(2413654, 0, 35.234, 45.324, "P");
	 * if(result.flag !== constants.OK) { console.log(result.error); }
	 * console.log(`Ascendant: ${result.data.points[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function houses_ex2(tjd_ut: number, iflag: number, geolat: number, geolon: number, hsys: HouseSystems): HousesEx<12>;
	export function houses_ex2(tjd_ut: number, iflag: number, geolat: number, geolon: number, hsys: "G"): HousesEx<36>;

	/**
	 * ### Description
	 * Calculate houses and other points
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time
	 * • geolat: number // Geographic latitude
	 * • geolon: number // Geographic longitude
	 * • hsys: string // House system ID
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   data: Object {
	 *     houses: Array<number> [
	 *       house_1: number, // Longitude of the first house
	 *       house_2: number, // Longitude of the second house
	 *       house_3: number, // Longitude of the third house
	 *       ... // 36 houses if gauquelin sectors, 12 houses otherwise
	 *     ],
	 *     points: Array<number> [
	 *       asc: number, // Ascendant
	 *       mc: number, // Midheaven
	 *       armc: number, // Right Ascension of the midheaven
	 *       vertex: number, // Vertex
	 *       equasc: number, // Equatorial Ascendant
	 *       coasc1: number, // Co-Ascendant (Walter Koch)
	 *       coasc2: number, // Co-Ascendant (Michael Munkasey)
	 *       polasc: number, // Polar Ascendant (Michael Munkasey)
	 *     ]
	 *   }
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = houses(2413654, 35.234, 45.324, "P");
	 * if(result.flag !== constants.OK) { console.log("something went wrong, check output") }
	 * console.log(`Ascendant: ${result.data.points[0]}`);
	 * ```
	 * &nbsp;
	 */
	export function houses(tjd_ut: number, geolat: number, geolon: number, hsys: HouseSystems): Houses<12>;
	export function houses(tjd_ut: number, geolat: number, geolon: number, hsys: "G"): Houses<36>;

	/**
	 * ### Description
	 * Convert julian day in ephemeris/terrestrial time to calendar date
	 * ### Params
	 * ```
	 * • tjd_et: number // Julian day in ephemeris/terrestrial time
	 * • gregflag: number // Calendar system, SE_GREG_CAL for gregorian calendar, SE_JUL_CAL for julian calendar
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   year: number; // Full year
	 *   month: number; // Month (1-12)
	 *   day: number; // Day (1-31)
	 *   hour: number; // Hour (0-23)
	 *   minute: number; // Minute (0-59)
	 *   second: number; // Second including fraction (0-59.999999)
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const date = jdet_to_utc(2415423, constants.GREG_CAL);
	 * console.log(date);
	 * ```
	 * &nbsp;
	 */
	export function jdet_to_utc(tjd_et: number, gregflag: number): DateObject

	/**
	 * ### Description
	 * Convert julian day in universal time to calendar date
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time
	 * • gregflag: number // Calendar system, SE_GREG_CAL for gregorian calendar, SE_JUL_CAL for julian calendar
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   year: number; // Full year
	 *   month: number; // Month (1-12)
	 *   day: number; // Day (1-31)
	 *   hour: number; // Hour (0-23)
	 *   minute: number; // Minute (0-59)
	 *   second: number; // Second including fraction (0-59.999999)
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const date = jdut1_to_utc(2415423, constants.GREG_CAL);
	 * console.log(date);
	 * ```
	 * &nbsp;
	 */
	export function jdut1_to_utc(tjd_ut: number, gregflag: number): DateObject;

	/**
	 * ### Description
	 * Convert a calendar date to julian day in universal time
	 * ### Params
	 * ```
	 * • year: number // Full year
	 * • month: number // Month (1-12)
	 * • day: number // Day (1-31)
	 * • hour: number // Hour with fraction (0-23.999999)
	 * • gregflag: number // Calendar system, SE_GREG_CAL for gregorian calendar, SE_JUL_CAL for julian calendar
	 * ```
	 * ### Returns
	 * ```
	 * number // Julian day value in universal time
	 * ```
	 * ### Example
	 * ```
	 * const jd = julday(2010, 5, 25, 14.5, constants.SE_GREG_CAL); // 2455342.1041666665
	 * ```
	 * &nbsp;
	 */
	export function julday(year: number, month: number, day: number, hour: number, gregflag: number): number

	/**
	 * ### Description
	 * Transform local apparent time to local mean time
	 * ### Params
	 * ```
	 * • tjd_lat: number // Local apparent time in julian day in universal time
	 * • geolon: number // Geographic longitude
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message in case of error
	 *   data: number // Local mean time in julian day in universal time
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = lat_to_lmt(2416547, -115.156);
	 * if(result.flag !== constants.OK) { console.log(result.error); }
	 * console.log(`LMT: ${result.data}`)
	 * ```
	 * &nbsp;
	 */
	export function lat_to_lmt(tjd_lat: number, geolon: number): LocalMeanTime;

	/**
	 * ### Description
	 * Transform local mean time to local apparent time
	 * ### Params
	 * ```
	 * • tjd_lmt: number // Local mean time in julian day in universal time
	 * • geolon: number // Geographic longitude
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message in case of error
	 *   data: number // Local apparent time in julian day in universal time
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = lmt_to_lat(2416547, -115.156);
	 * if(result.flag !== constants.OK) { console.log(result.error); }
	 * console.log(`LMT: ${result.data}`)
	 * ```
	 * &nbsp;
	 */
	export function lmt_to_lat(tjd_lmt: number, geolon: number): LocalApparentTime;

	/**
	 * 
	 * @param tjd_ut 
	 * @param ifl 
	 * @param geopos 
	 */

	/**
	 * ### Description
	 * Get lunar eclipse data for a given date
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time
	 * • ifl: number // ephemeris flag
	 * • geopos: Array<number> // Geographic coordinates [longitude, latitude, elevation]
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // ERR, eclipse type (SE_ECL_TOTAL, SE_ECL_PENUMBRAL, SE_ECL_PARTIAL) or 0 if no eclipse
	 *   error: string, // Error message in case of error
	 *   data: Array<number> [
	 *      umbral_mag, // Umbral magnitude at jd
	 *      penumbral_mag, // Penumbral magnitude
	 *      -, // Unused
	 *      -, // Unused
	 *      azimuth, // Azimuth of the moon at jd (not implemented yet)
	 *      true_altitude, // True altitude of the moon above horizon at jd (not implemented yet)
	 *      apparent_altitude, // Apparent altitude of the moon above horizon at jd (not implemented yet)
	 *      distance, // Distance of the moon from opposition in degrees
	 *      eclipse_mag, // Eclipse magnitude (same as umbral magnitude)
	 *      saros_number, // Saros series number (if available, otherwise -99999999)
	 *      saros_member // Saros series member number (if available, otherwise -99999999)
	 *   ]
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = lun_eclipse_how(2416547, constants.SEFLG_SWIEPH, [10,45,500]);
	 * if(result.flag === constants.ERR) { throw new Error(result.error); }
	 * console.log(`
	 *   type: ${result.flag}
	 *   magnitude: ${result.data[0]}
	 * `)
	 * ```
	 * &nbsp;
	 */
	export function lun_eclipse_how(tjd_ut: number, ifl: number, geopos: [longitude: number, latitude: number, elevation: number]): LunEclipseHow;

	/**
	 * 
	 * @param tjd_start 
	 * @param ifL 
	 * @param geopos 
	 * @param backwards 
	 */
	export function lun_eclipse_when_loc(tjd_start: number, ifL: number, geopos: [longitude: number, latitude: number, elevation: number], backwards: boolean): {
		flag: number;
		error: string;
		data: {
			time: [10],
			attributes: [11]
		}
	}

	/**
	 * 
	 * @param tjd_start 
	 * @param ifL 
	 * @param ifltype 
	 * @param backwards 
	 */
	export function lun_eclipse_when(tjd_start: number, ifL: number, ifltype: number, backwards: boolean): {
		flag: number;
		error: string;
		data: [8]
	}

	/**
	 * 
	 * @param tjd_start 
	 * @param ipl 
	 * @param starname 
	 * @param ifl 
	 * @param ifltype 
	 * @param backward 
	 */
	export function lun_occult_when_glob(tjd_start: number, ipl: number, starname: string | null, ifl: number, ifltype: number, backward: boolean): {
		flag: number;
		error: string;
		data: [10]
	}

	/**
	 * 
	 * @param tjd_start 
	 * @param ipl 
	 * @param starname 
	 * @param ifl 
	 * @param geopos 
	 * @param backward 
	 */
	export function lun_occult_when_loc(tjd_start: number, ipl: number, starname: string | null, ifl: number, geopos: [longitude: number, latitude: number, elevation: number], backward: boolean): {
		flag: number;
		error: string;
		data: {
			time: [7],
			attributes: [8]
		}
	}

	/**
	 * 
	 * @param tjd_start 
	 * @param ipl 
	 * @param starname 
	 * @param ifl 
	 */
	export function lun_occult_where(tjd_start: number, ipl: number, starname: string | null, ifl: number): {
		flag: number;
		error: string;
		data: {
			coordinates: [10],
			attributes: [8]
		}
	}

	/**
	 * 
	 * @param tjd_ut 
	 * @param ipl 
	 * @param iflag 
	 * @param method 
	 */
	export function nod_aps_ut(tjd_ut: number, ipl: number, iflag: number, method: number): {
		flag: number;
		error: string;
		data: {
			ascending: [6],
			descending: [6],
			perihelion: [6],
			aphelion: [6]
		}
	}

	/**
	 * 
	 * @param tjd_et 
	 * @param ipl 
	 * @param iflag 
	 * @param method 
	 */
	export function nod_aps(tjd_et: number, ipl: number, iflag: number, method: number): {
		flag: number;
		error: string;
		data: {
			ascending: [6],
			descending: [6],
			perihelion: [6],
			aphelion: [6]
		}
	}

	/**
	 * 
	 * @param tjd_et 
	 * @param ipl 
	 * @param iflag 
	 */

	/**
	 * ### Description
	 * Get orbital maximum and minimum possible distances
	 * ### Params
	 * ```
	 * • tjd_et: number // Julian day in ephemeris/terrestrial time
	 * • ipl: number // Object ID
	 * • iflag: number // Calculation flags
	 * ```
	 * ### Returns
	 * ```
	 * Object {
	 *   flag: number, // OK or ERR
	 *   error: string, // Error message or warning if any
	 *   data: Object {
	 *     max: number, // maximum possible distance
	 *     min: number, // minimum possible distance
	 *     true: number // current true distance
	 *   }
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = orbit_max_min_true_distance(2416547, constants.SE_MOON, constants.SEFLG_SWIEPH);
	 * if(result.error) { console.log(result.error); }
	 * console.log(`Max: ${result.data.max}`)
	 * ```
	 * &nbsp;
	 */
	export function orbit_max_min_true_distance(tjd_et: number, ipl: number, iflag: number): OrbitMaxMinTrueDistance;

	/**
	 * 
	 * @param tjd_ut 
	 * @param ipl 
	 * @param iflag 
	 */
	export function pheno_ut(tjd_ut: number, ipl: number, iflag: number): {
		flag: number;
		error: string;
		data: [5];
	}

	/**
	 * 
	 * @param tjd_et 
	 * @param ipl 
	 * @param iflag 
	 */
	export function pheno(tjd_et: number, ipl: number, iflag: number): {
		flag: number;
		error: string;
		data: [5];
	}

	/**
	 * ### Description
	 * Normalize radians to 0π-2π range
	 * ### Params
	 * ```
	 * • drad: number // Degree value in radians
	 * ```
	 * ### Returns
	 * ```
	 * number // Normalized radian value
	 * ```
	 * ### Example
	 * ```
	 * const rad = radnorm(8.525) // 2.241814692820414
	 * ```
	 * &nbsp;
	 */
	export function radnorm(drad: number): number;

	/**
	 * 
	 * @param inalt 
	 * @param geoalt 
	 * @param atpress 
	 * @param lapse_rate 
	 * @param attemp 
	 * @param calc_flag 
	 */
	export function refrac_extended(inalt: number, geoalt: number, atpress: number, lapse_rate: number, attemp: number, calc_flag: number): {
		data: number,
		extended: [4]
	}

	/**
	 * 
	 * @param inalt 
	 * @param atpress 
	 * @param attemp 
	 * @param calc_flag 
	 */
	export function refrac(inalt: number, atpress: number, attemp: number, calc_flag: number): number;

	/**
	 * 
	 * @param tjd 
	 * @param gregflag 
	 */
	export function revjul(tjd: number, gregflag: number): {
		year: number,
		month: number,
		day: number,
		hour: number
	}

	/**
	 * 
	 * @param tjd_ut 
	 * @param ipl 
	 * @param starname 
	 * @param epheflag 
	 * @param rsmi 
	 * @param geopos 
	 * @param atpress 
	 * @param attemp 
	 * @param horhgt 
	 */
	export function rise_trans_true_hor(tjd_ut: number, ipl: number, starname: string | null, epheflag: number, rsmi: number, geopos: [longitude: number, latitude: number, elevation: number], atpress: number, attemp: number, horhgt: number): {
		flag: number;
		error: string;
		data: number;
	}

	/**
	 * 
	 * @param tjd_ut 
	 * @param ipl 
	 * @param starname 
	 * @param epheflag 
	 * @param rsmi 
	 * @param geopos 
	 * @param atpress 
	 * @param attemp 
	 */
	export function rise_trans(tjd_ut: number, ipl: number, starname: string | null, epheflag: number, rsmi: number, geopos: [longitude: number, latitude: number, elevation: number], atpress: number, attemp: number): {
		flag: number;
		error: string;
		data: number;
	}

	/**
	 * ### Description
	 * Set custom delta T
	 * ### Params
	 * ```
	 * • t_acc: number // Delta T value
	 * ```
	 * ### Example
	 * ```
	 * // custom delta T
	 * set_delta_t_userdef(66.5);
	 * // reset delta T back to auto
	 * set_delta_t_userdef(constants.SE_DELTAT_AUTOMATIC);
	 * ```
	 * &nbsp;
	 */
	export function set_delta_t_userdef(t_acc: number): void;

	/**
	 * ### Description
	 * Set ephemeris files location
	 * ### Params
	 * ```
	 * • path: string // Ephemeris path
	 * ```
	 * ### Example
	 * ```
	 * set_ephe_path("./ephemeris");
	 * ```
	 * &nbsp;
	 */
	export function set_ephe_path(path: string): void;

	/**
	 * ### Description
	 * Set JPL file  
	 * File must be placed in the ephemeris path
	 * ### Params
	 * ```
	 * • file: string // JPL file name
	 * ```
	 * ### Example
	 * ```
	 * // use custom name
	 * set_jpl_file("de405.eph");
	 * // use predefined name
	 * set_jpl_file(constants.SE_FNAME_DE405);
	 * ```
	 * &nbsp;
	 */
	export function set_jpl_file(file: string): void;

	/**
	 * ### Description
	 * Set ayanamsa for sidereal mode  
	 * For predefined ayanamsas, set second and third parameters to 0  
	 * ### Params
	 * ```
	 * • sid_mode: number // Ayanamsa ID
	 * • t0: number // Reference date in jd_ut for custom ayanamsas
	 * • ayan_t0: number // Initial value in degrees for custom ayanamsas
	 * ```
	 * ### Example
	 * ```
	 * // set ayanamsa to Lahiri
	 * set_sid_mode(constants.SE_SIDM_LAHIRI, 0, 0)
	 * // define custom ayanamsa as 25 degrees at J2000
	 * set_sid_mode(constants.SE_SIDM_USER, 2451545, 25)
	 * ```
	 * &nbsp;
	 */
	export function set_sid_mode(sid_mode: number, t0: number, ayan_t0: number): void;

	/**
	 * ### Description
	 * Set custom tidal acceleration
	 * ### Params
	 * ```
	 * • t_acc: number // Tidal acceleration value
	 * ```
	 * ### Example
	 * ```
	 * // set custom value
	 * set_tid_acc(25.90);
	 * // set predefined value
	 * set_tid_acc(constants.SE_TIDAL_DE403);
	 * // reset to auto
	 * set_tid_acc(constants.SE_TIDAL_AUTOMATIC);
	 * ```
	 * &nbsp;
	 */
	export function set_tid_acc(t_acc: number): void;

	/**
	 * ### Description
	 * Set geographic coordinates for topocentric mode
	 * ### Params
	 * ```
	 * • geolon: number // Geographic longitude in degrees
	 * • geolat: number // Geographic latitude in degrees
	 * • elevation: number // Elevation in meters
	 * ```
	 * ### Example
	 * ```
	 * // set observer to 124'30E, 23'30N, 1250 meters above sea level;
	 * set_topo(124.5, 23.5, 1250);
	 * // call function with topocentric flag
	 * let result = calc(2342341, constants.SE_MOON, constants.SEFLG_SWIEPH | constants.SEFLG_TOPOCTR)
	 * ```
	 * &nbsp;
	 */
	export function set_topo(geolon: number, geolat: number, elevation: number): void;

	/**
	 * 
	 * @param tjd_ut 
	 */
	export function sidtime(tjd_ut: number): number;

	/**
	 * 
	 * @param tjd_ut 
	 * @param eps 
	 * @param nut 
	 */
	export function sidtime0(tjd_ut: number, eps: number, nut: number): number;

	/**
	 * 
	 * @param tjd_ut 
	 * @param ifl 
	 * @param geopos 
	 */
	export function sol_eclipse_how(tjd_ut: number, ifl: number, geopos: [longitude: number, latitude: number, elevation: number]): {
		flag: number;
		error: string;
		data: [11]
	}

	/**
	 * 
	 * @param tjd_start 
	 * @param ifl 
	 * @param iftype 
	 * @param backward 
	 */
	export function sol_eclipse_when_glob(tjd_start: number, ifl: number, iftype: number, backward: number): {
		flag: number;
		error: string;
		data: [10]
	}

	/**
	 * 
	 * @param tjd_start 
	 * @param ifL 
	 * @param geopos 
	 * @param backwards 
	 */
	export function sol_eclipse_when_loc(tjd_start: number, ifL: number, geopos: [longitude: number, latitude: number, elevation: number], backwards: boolean): {
		flag: number;
		error: string;
		data: {
			time: [7],
			attributes: [11]
		}
	}

	/**
	 * 
	 * @param tjd_ut 
	 * @param ifl 
	 */
	export function sol_eclipse_where(tjd_ut: number, ifl: number): {
		flag: number;
		error: string;
		data: {
			coordinates: [10],
			attributes: [11]
		}
	}

	/**
	 * 
	 * @param ddeg 
	 * @param roundflag 
	 */
	export function split_deg(ddeg: number, roundflag: number): {
		degree: number,
		minute: number,
		second: number,
		fraction: number,
		sign: number
	}

	/**
	 * 
	 * @param tjd_ut 
	 */
	export function time_equ(tjd_ut: number): {
		flag: number,
		error: string,
		data: number
	}

	/**
	 * 
	 * @param iyear 
	 * @param imonth 
	 * @param iday 
	 * @param ihour 
	 * @param imin 
	 * @param dsec 
	 * @param d_timezone 
	 */
	export function utc_time_zone(iyear: number, imonth: number, iday: number, ihour: number, imin: number, dsec: number, d_timezone: number): {
		year: number;
		month: number;
		day: number;
		hour: number;
		minute: number;
		seconds: number;
	}

	/**
	 * 
	 * @param iyear 
	 * @param imonth 
	 * @param iday 
	 * @param ihour 
	 * @param imin 
	 * @param dsec 
	 * @param gregflag 
	 */
	export function utc_to_jd(iyear: number, imonth: number, iday: number, ihour: number, imin: number, dsec: number, gregflag: number): {
		flag: number,
		error: string,
		data: [2]
	}


	/**
	 * ### Description
	 * Get current swisseph version
	 * ### Returns
	 * ```
	 * string // Swisseph version
	 * ```
	 * ### Example
	 * ```
	 * const version = version(); // "2.10"
	 * ```
	 * &nbsp;
	 */
	export function version(): string;

	export function vis_limit_mag(tjd_ut: number, dgeo: [longitude: number, latitude: number, elevation: number], datm: [pressure: number, temperature: number, humidity: number, meteorological_range: number], dobs: [age: number, sellen_ratio: number, optical_type: number, optical_magnification: number, optical_aperture: number, optical_transmission: number], objectname: string, helflag: number): {
		flag: number,
		error: string,
		data: [8]
	}

	/**
	 * ### Description
	 * Swisseph Constants  
	 * Contains aliases and predefined constant values used in the swiss ephemeris
	 */
	export const enum constants {
		OK = 0,
		ERR = -1,
		SE_AUNIT_TO_KM = 149597870.7,
		SE_AUNIT_TO_LIGHTYEAR = 0.000015812507409819728,
		SE_AUNIT_TO_PARSEC = 0.000004848136811095274,
		SE_JUL_CAL = 0,
		SE_GREG_CAL = 1,
		SE_ECL_NUT = -1,
		SE_SUN = 0,
		SE_MOON = 1,
		SE_MERCURY = 2,
		SE_VENUS = 3,
		SE_MARS = 4,
		SE_JUPITER = 5,
		SE_SATURN = 6,
		SE_URANUS = 7,
		SE_NEPTUNE = 8,
		SE_PLUTO = 9,
		SE_MEAN_NODE = 10,
		SE_TRUE_NODE = 11,
		SE_MEAN_APOG = 12,
		SE_OSCU_APOG = 13,
		SE_EARTH = 14,
		SE_CHIRON = 15,
		SE_PHOLUS = 16,
		SE_CERES = 17,
		SE_PALLAS = 18,
		SE_JUNO = 19,
		SE_VESTA = 20,
		SE_INTP_APOG = 21,
		SE_INTP_PERG = 22,
		SE_NPLANETS = 23,
		SE_PLMOON_OFFSET = 9000,
		SE_AST_OFFSET = 10000,
		SE_VARUNA = 30000,
		SE_FICT_OFFSET = 40,
		SE_FICT_OFFSET_1 = 39,
		SE_FICT_MAX = 999,
		SE_NFICT_ELEM = 15,
		SE_COMET_OFFSET = 1000,
		SE_NALL_NAT_POINTS = 38,
		SE_CUPIDO = 40,
		SE_HADES = 41,
		SE_ZEUS = 42,
		SE_KRONOS = 43,
		SE_APOLLON = 44,
		SE_ADMETOS = 45,
		SE_VULKANUS = 46,
		SE_POSEIDON = 47,
		SE_ISIS = 48,
		SE_NIBIRU = 49,
		SE_HARRINGTON = 50,
		SE_NEPTUNE_LEVERRIER = 51,
		SE_NEPTUNE_ADAMS = 52,
		SE_PLUTO_LOWELL = 53,
		SE_PLUTO_PICKERING = 54,
		SE_VULCAN = 55,
		SE_WHITE_MOON = 56,
		SE_PROSERPINA = 57,
		SE_WALDEMATH = 58,
		SE_FIXSTAR = -10,
		SE_ASC = 0,
		SE_MC = 1,
		SE_ARMC = 2,
		SE_VERTEX = 3,
		SE_EQUASC = 4,
		SE_COASC1 = 5,
		SE_COASC2 = 6,
		SE_POLASC = 7,
		SE_NASCMC = 8,
		SEFLG_JPLEPH = 1,
		SEFLG_SWIEPH = 2,
		SEFLG_MOSEPH = 4,
		SEFLG_HELCTR = 8,
		SEFLG_TRUEPOS = 16,
		SEFLG_J2000 = 32,
		SEFLG_NONUT = 64,
		SEFLG_SPEED3 = 128,
		SEFLG_SPEED = 256,
		SEFLG_NOGDEFL = 512,
		SEFLG_NOABERR = 1024,
		SEFLG_ASTROMETRIC = 1536,
		SEFLG_EQUATORIAL = 2048,
		SEFLG_XYZ = 4096,
		SEFLG_RADIANS = 8192,
		SEFLG_BARYCTR = 16384,
		SEFLG_TOPOCTR = 32768,
		SEFLG_ORBEL_AA = 32768,
		SEFLG_TROPICAL = 0,
		SEFLG_SIDEREAL = 65536,
		SEFLG_ICRS = 131072,
		SEFLG_DPSIDEPS_1980 = 262144,
		SEFLG_JPLHOR = 262144,
		SEFLG_JPLHOR_APPROX = 524288,
		SEFLG_CENTER_BODY = 1048576,
		SEFLG_TEST_PLMOON = 2228280,
		SE_SIDBITS = 256,
		SE_SIDBIT_ECL_T0 = 256,
		SE_SIDBIT_SSY_PLANE = 512,
		SE_SIDBIT_USER_UT = 1024,
		SE_SIDBIT_ECL_DATE = 2048,
		SE_SIDBIT_NO_PREC_OFFSET = 4096,
		SE_SIDBIT_PREC_ORIG = 8192,
		SE_SIDM_FAGAN_BRADLEY = 0,
		SE_SIDM_LAHIRI = 1,
		SE_SIDM_DELUCE = 2,
		SE_SIDM_RAMAN = 3,
		SE_SIDM_USHASHASHI = 4,
		SE_SIDM_KRISHNAMURTI = 5,
		SE_SIDM_DJWHAL_KHUL = 6,
		SE_SIDM_YUKTESHWAR = 7,
		SE_SIDM_JN_BHASIN = 8,
		SE_SIDM_BABYL_KUGLER1 = 9,
		SE_SIDM_BABYL_KUGLER2 = 10,
		SE_SIDM_BABYL_KUGLER3 = 11,
		SE_SIDM_BABYL_HUBER = 12,
		SE_SIDM_BABYL_ETPSC = 13,
		SE_SIDM_ALDEBARAN_15TAU = 14,
		SE_SIDM_HIPPARCHOS = 15,
		SE_SIDM_SASSANIAN = 16,
		SE_SIDM_GALCENT_0SAG = 17,
		SE_SIDM_J2000 = 18,
		SE_SIDM_J1900 = 19,
		SE_SIDM_B1950 = 20,
		SE_SIDM_SURYASIDDHANTA = 21,
		SE_SIDM_SURYASIDDHANTA_MSUN = 22,
		SE_SIDM_ARYABHATA = 23,
		SE_SIDM_ARYABHATA_MSUN = 24,
		SE_SIDM_SS_REVATI = 25,
		SE_SIDM_SS_CITRA = 26,
		SE_SIDM_TRUE_CITRA = 27,
		SE_SIDM_TRUE_REVATI = 28,
		SE_SIDM_TRUE_PUSHYA = 29,
		SE_SIDM_GALCENT_RGILBRAND = 30,
		SE_SIDM_GALEQU_IAU1958 = 31,
		SE_SIDM_GALEQU_TRUE = 32,
		SE_SIDM_GALEQU_MULA = 33,
		SE_SIDM_GALALIGN_MARDYKS = 34,
		SE_SIDM_TRUE_MULA = 35,
		SE_SIDM_GALCENT_MULA_WILHELM = 36,
		SE_SIDM_ARYABHATA_522 = 37,
		SE_SIDM_BABYL_BRITTON = 38,
		SE_SIDM_TRUE_SHEORAN = 39,
		SE_SIDM_GALCENT_COCHRANE = 40,
		SE_SIDM_GALEQU_FIORENZA = 41,
		SE_SIDM_VALENS_MOON = 42,
		SE_SIDM_LAHIRI_1940 = 43,
		SE_SIDM_LAHIRI_VP285 = 44,
		SE_SIDM_KRISHNAMURTI_VP291 = 45,
		SE_SIDM_LAHIRI_ICRC = 46,
		SE_SIDM_USER = 255,
		SE_NSIDM_PREDEF = 47,
		SE_NODBIT_MEAN = 1,
		SE_NODBIT_OSCU = 2,
		SE_NODBIT_OSCU_BAR = 4,
		SE_NODBIT_FOPOINT = 256,
		SEFLG_DEFAULTEPH = 2,
		SE_MAX_STNAME = 256,
		SE_ECL_CENTRAL = 1,
		SE_ECL_NONCENTRAL = 2,
		SE_ECL_TOTAL = 4,
		SE_ECL_ANNULAR = 8,
		SE_ECL_PARTIAL = 16,
		SE_ECL_ANNULAR_TOTAL = 32,
		SE_ECL_HYBRID = 32,
		SE_ECL_PENUMBRAL = 64,
		SE_ECL_ALLTYPES_SOLAR = 63,
		SE_ECL_ALLTYPES_LUNAR = 84,
		SE_ECL_VISIBLE = 128,
		SE_ECL_MAX_VISIBLE = 256,
		SE_ECL_1ST_VISIBLE = 512,
		SE_ECL_PARTBEG_VISIBLE = 512,
		SE_ECL_2ND_VISIBLE = 1024,
		SE_ECL_TOTBEG_VISIBLE = 1024,
		SE_ECL_3RD_VISIBLE = 2048,
		SE_ECL_TOTEND_VISIBLE = 2048,
		SE_ECL_4TH_VISIBLE = 4096,
		SE_ECL_PARTEND_VISIBLE = 4096,
		SE_ECL_PENUMBBEG_VISIBLE = 8192,
		SE_ECL_PENUMBEND_VISIBLE = 16384,
		SE_ECL_OCC_BEG_DAYLIGHT = 8192,
		SE_ECL_OCC_END_DAYLIGHT = 16384,
		SE_ECL_ONE_TRY = 32768,
		SE_CALC_RISE = 1,
		SE_CALC_SET = 2,
		SE_CALC_MTRANSIT = 4,
		SE_CALC_ITRANSIT = 8,
		SE_BIT_DISC_CENTER = 256,
		SE_BIT_DISC_BOTTOM = 8192,
		SE_BIT_GEOCTR_NO_ECL_LAT = 128,
		SE_BIT_NO_REFRACTION = 512,
		SE_BIT_CIVIL_TWILIGHT = 1024,
		SE_BIT_NAUTIC_TWILIGHT = 2048,
		SE_BIT_ASTRO_TWILIGHT = 4096,
		SE_BIT_FIXED_DISC_SIZE = 16384,
		SE_BIT_FORCE_SLOW_METHOD = 32768,
		SE_BIT_HINDU_RISING = 896,
		SE_ECL2HOR = 0,
		SE_EQU2HOR = 1,
		SE_HOR2ECL = 0,
		SE_HOR2EQU = 1,
		SE_TRUE_TO_APP = 0,
		SE_APP_TO_TRUE = 1,
		SE_DE_NUMBER = 431,
		SE_FNAME_DE200 = "de200.eph",
		SE_FNAME_DE403 = "de403.eph",
		SE_FNAME_DE404 = "de404.eph",
		SE_FNAME_DE405 = "de405.eph",
		SE_FNAME_DE406 = "de406.eph",
		SE_FNAME_DE431 = "de431.eph",
		SE_FNAME_DFT = "de431.eph",
		SE_FNAME_DFT2 = "de406.eph",
		SE_STARFILE_OLD = "fixstars.cat",
		SE_STARFILE = "sefstars.txt",
		SE_ASTNAMFILE = "seasnam.txt",
		SE_FICTFILE = "seorbel.txt",
		SE_SPLIT_DEG_ROUND_SEC = 1,
		SE_SPLIT_DEG_ROUND_MIN = 2,
		SE_SPLIT_DEG_ROUND_DEG = 4,
		SE_SPLIT_DEG_ZODIACAL = 8,
		SE_SPLIT_DEG_NAKSHATRA = 1024,
		SE_SPLIT_DEG_KEEP_SIGN = 16,
		SE_SPLIT_DEG_KEEP_DEG = 32,
		SE_HELIACAL_RISING = 1,
		SE_HELIACAL_SETTING = 2,
		SE_MORNING_FIRST = 1,
		SE_EVENING_LAST = 2,
		SE_EVENING_FIRST = 3,
		SE_MORNING_LAST = 4,
		SE_ACRONYCHAL_RISING = 5,
		SE_ACRONYCHAL_SETTING = 6,
		SE_COSMICAL_SETTING = 6,
		SE_HELFLAG_LONG_SEARCH = 128,
		SE_HELFLAG_HIGH_PRECISION = 256,
		SE_HELFLAG_OPTICAL_PARAMS = 512,
		SE_HELFLAG_NO_DETAILS = 1024,
		SE_HELFLAG_SEARCH_1_PERIOD = 2048,
		SE_HELFLAG_VISLIM_DARK = 4096,
		SE_HELFLAG_VISLIM_NOMOON = 8192,
		SE_HELFLAG_VISLIM_PHOTOPIC = 16384,
		SE_HELFLAG_VISLIM_SCOTOPIC = 32768,
		SE_HELFLAG_AV = 65536,
		SE_HELFLAG_AVKIND_VR = 65536,
		SE_HELFLAG_AVKIND_PTO = 131072,
		SE_HELFLAG_AVKIND_MIN7 = 262144,
		SE_HELFLAG_AVKIND_MIN9 = 524288,
		SE_HELFLAG_AVKIND = 983040,
		TJD_INVALID = 99999999,
		SIMULATE_VICTORVB = 1,
		SE_PHOTOPIC_FLAG = 0,
		SE_SCOTOPIC_FLAG = 1,
		SE_MIXEDOPIC_FLAG = 2,
		SE_TIDAL_DE200 = -23.8946,
		SE_TIDAL_DE403 = -25.58,
		SE_TIDAL_DE404 = -25.58,
		SE_TIDAL_DE405 = -25.826,
		SE_TIDAL_DE406 = -25.826,
		SE_TIDAL_DE421 = -25.85,
		SE_TIDAL_DE422 = -25.85,
		SE_TIDAL_DE430 = -25.82,
		SE_TIDAL_DE431 = -25.8,
		SE_TIDAL_26 = -26,
		SE_TIDAL_STEPHENSON_2016 = -25.85,
		SE_TIDAL_DEFAULT = -25.8,
		SE_TIDAL_AUTOMATIC = 999999,
		SE_TIDAL_MOSEPH = -25.58,
		SE_TIDAL_SWIEPH = -25.8,
		SE_TIDAL_JPLEPH = -25.8,
		SE_DELTAT_AUTOMATIC = 0.0000000001,
		SE_MODEL_DELTAT = 0,
		SE_MODEL_PREC_LONGTERM = 1,
		SE_MODEL_PREC_SHORTTERM = 2,
		SE_MODEL_NUT = 3,
		SE_MODEL_BIAS = 4,
		SE_MODEL_JPLHOR_MODE = 5,
		SE_MODEL_JPLHORA_MODE = 6,
		SE_MODEL_SIDT = 7,
		NSE_MODELS = 8,
		SEMOD_NPREC = 11,
		SEMOD_PREC_IAU_1976 = 1,
		SEMOD_PREC_LASKAR_1986 = 2,
		SEMOD_PREC_WILL_EPS_LASK = 3,
		SEMOD_PREC_WILLIAMS_1994 = 4,
		SEMOD_PREC_SIMON_1994 = 5,
		SEMOD_PREC_IAU_2000 = 6,
		SEMOD_PREC_BRETAGNON_2003 = 7,
		SEMOD_PREC_IAU_2006 = 8,
		SEMOD_PREC_VONDRAK_2011 = 9,
		SEMOD_PREC_OWEN_1990 = 10,
		SEMOD_PREC_NEWCOMB = 11,
		SEMOD_PREC_DEFAULT = 9,
		SEMOD_PREC_DEFAULT_SHORT = 9,
		SEMOD_NNUT = 5,
		SEMOD_NUT_IAU_1980 = 1,
		SEMOD_NUT_IAU_CORR_1987 = 2,
		SEMOD_NUT_IAU_2000A = 3,
		SEMOD_NUT_IAU_2000B = 4,
		SEMOD_NUT_WOOLARD = 5,
		SEMOD_NUT_DEFAULT = 4,
		SEMOD_NSIDT = 4,
		SEMOD_SIDT_IAU_1976 = 1,
		SEMOD_SIDT_IAU_2006 = 2,
		SEMOD_SIDT_IERS_CONV_2010 = 3,
		SEMOD_SIDT_LONGTERM = 4,
		SEMOD_SIDT_DEFAULT = 4,
		SEMOD_NBIAS = 3,
		SEMOD_BIAS_NONE = 1,
		SEMOD_BIAS_IAU2000 = 2,
		SEMOD_BIAS_IAU2006 = 3,
		SEMOD_BIAS_DEFAULT = 3,
		SEMOD_NJPLHOR = 2,
		SEMOD_JPLHOR_LONG_AGREEMENT = 1,
		SEMOD_JPLHOR_DEFAULT = 1,
		SEMOD_NJPLHORA = 3,
		SEMOD_JPLHORA_1 = 1,
		SEMOD_JPLHORA_2 = 2,
		SEMOD_JPLHORA_3 = 3,
		SEMOD_JPLHORA_DEFAULT = 3,
		SEMOD_NDELTAT = 5,
		SEMOD_DELTAT_STEPHENSON_MORRISON_1984 = 1,
		SEMOD_DELTAT_STEPHENSON_1997 = 2,
		SEMOD_DELTAT_STEPHENSON_MORRISON_2004 = 3,
		SEMOD_DELTAT_ESPENAK_MEEUS_2006 = 4,
		SEMOD_DELTAT_STEPHENSON_ETC_2016 = 5,
		SEMOD_DELTAT_DEFAULT = 5
	}
}
