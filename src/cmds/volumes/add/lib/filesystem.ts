/*
 *  Stores the filesystem schema for a new volume.
 *  Created On 04 November 2021
 */

import { VyuhaImpl } from 'vyuha/dist/util/validate/interface'

export const structure: VyuhaImpl[] = [
    {
        name: 'Archives',
        type: 'directory',
    },
    {
        name: 'Workarea',
        type: 'directory',
    },
    {
        name: 'Templates',
        type: 'directory',
        children: [
            {
                name: 'Video',
                type: 'directory',
                children: [
                    {
                        name: 'Metadata',
                        type: 'directory',
                        children: [
                            {
                                name: 'Images',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'Sources',
                                        type: 'directory',
                                    },
                                    {
                                        name: 'Renders',
                                        type: 'directory',
                                    },
                                ],
                            },
                            {
                                name: 'Script.nir',
                                type: 'file',
                            },
                        ],
                    },
                    {
                        name: 'Media',
                        type: 'directory',
                        children: [
                            {
                                name: 'Frames',
                                type: 'directory',
                            },
                            {
                                name: 'Video',
                                type: 'directory',
                            },
                            {
                                name: 'Audio',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'Music',
                                        type: 'directory',
                                    },
                                    {
                                        name: 'Processed',
                                        type: 'directory',
                                    },
                                    {
                                        name: 'Raw',
                                        type: 'directory',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'Output',
                        type: 'directory',
                    },
                    {
                        name: 'Misc',
                        type: 'directory',
                        children: [
                            {
                                name: 'Webhooks',
                                type: 'directory',
                            },
                            {
                                name: 'Downloads',
                                type: 'directory',
                            },
                        ],
                    },
                ],
            },
        ],
    },
]
