import React from 'react';
import { Skeleton, Stack } from 'native-base';

export const ActivitySkeleton = props => {
    return (
        <Stack>
            <Skeleton>
                <Skeleton
                    variant='text'
                    height={ 6 }
                />
                <Skeleton
                    my={ 2 }
                    height={ 6 }
                    variant='rect'
                />
                <Skeleton
                    my={ 2 }
                    height={ 6 }
                    variant='circle'
                    size={ 20 }
                />
            </Skeleton>
        </Stack>
    );
};