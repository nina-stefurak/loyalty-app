import AsyncStorage from '@react-native-async-storage/async-storage';


export interface PointsRepository {
    addPoints(points: number) : Promise<number>;

    getPoints() : Promise<number>;

    removePoints(points: number): Promise<number>;
}

class LocalStoragePoints implements PointsRepository {

    async removePoints(points: number): Promise<number> {
        let availablePoints = await AsyncStorage.getItem(this.POINTS);
        if(!availablePoints){
            availablePoints = "0";
            return 0;
        }
        const newPoints = parseInt(availablePoints) - points;
        await AsyncStorage.setItem(this.POINTS, newPoints.toString());
        return newPoints;
    }
    private POINTS = 'POINTS';

    async addPoints(points: number): Promise<number> {
        let availablePoints = await AsyncStorage.getItem(this.POINTS);
        if(!availablePoints){
            availablePoints = "0";
        }
        const newPoints = parseInt(availablePoints) + points;
        console.log(`Old point: ${availablePoints} and new points: ${newPoints}`);
        await AsyncStorage.setItem(this.POINTS, newPoints.toString());
        return newPoints;
    }
    async getPoints(): Promise<number> {
        let availablePoints = await AsyncStorage.getItem(this.POINTS);
        console.log("Available points: " + availablePoints);
        if(!availablePoints){
            availablePoints = "0";
        }
        return parseInt(availablePoints);
    }

}

export const pointsRepository : PointsRepository = new LocalStoragePoints();