import * as TaskManager from 'expo-task-manager';

export const BACKGROUND_TASK_NAME = 'location-tracking';

TaskManager.defineTask(BACKGROUND_TASK_NAME, ({ data, error }: any) => {
  if (error) {
    console.log(error);
  } else {
    const { coords, timestamp } = data.locations[0];

    const currentLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp: timestamp,
    };

    console.log(currentLocation);
  }
});
