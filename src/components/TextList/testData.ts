import Text from '../../types/Text'
import TextState from '../../types/TextState';

const texts : Text[] = [
    {
        id: 'ID STRING AHAH',
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque necessitatibus pariatur, unde voluptate voluptas fugit eius nemo odit rerum veritatis temporibus praesentium, error dolore explicabo quo doloremque exercitationem accusantium?
        Eum vitae perspiciatis explicabo debitis fuga blanditiis, natus illo recusandae quaerat, cum placeat optio dolorem provident suscipit minus corporis labore illum! Repellendus nemo ullam tempore tempora omnis voluptate. Ex, quidem!
        Optio impedit accusantium perspiciatis, hic libero mollitia labore voluptatum, necessitatibus dignissimos, voluptate nemo numquam tempora ab corrupti alias. Impedit qui vitae maxime quo? Eos impedit ratione mollitia labore a at?
        Dolor eaque illum sunt dolores accusamus veritatis dolore, magnam similique ab mollitia aliquam maxime deleniti eos modi delectus hic odit molestias neque totam soluta, quisquam aperiam! Molestiae dolor ut enim.
        Molestiae tenetur dolores dolor quibusdam mollitia tempora ut amet ipsam repellat sit veritatis reiciendis, maxime vel ex quisquam unde repellendus voluptatum alias? Delectus sit facilis totam doloremque, corrupti id nobis?
        Natus suscipit repellat ut, nemo dolorem odit nam vel earum non illum inventore rem quis id enim sapiente sunt, ratione quasi numquam necessitatibus! Fuga voluptatibus iure doloribus corrupti tempore cumque.,`,
        state: TextState.toBeVerified,
    },
    {
        id: 'ID 2',
        text: 'this can be a new text written directly or a translation that was verified',
        state: TextState.verified,
        comment: 'this is a comment for this text',
    },
    {
        id: 'ID 3',
        text: 'this is a translation that has yet to be translated',
        state: TextState.toBeTranslated,
        feedback: 'this is a feedback',
        comment: 'this is a comment',
        link: 'these are links',
    },
    {
        id: 'ID 4',
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque necessitatibus pariatur, unde voluptate voluptas fugit eius nemo odit rerum veritatis temporibus praesentium, error dolore explicabo quo doloremque exercitationem accusantium?
        Eum vitae perspiciatis explicabo debitis fuga blanditiis, natus illo recusandae quaerat, cum placeat optio dolorem provident suscipit minus corporis labore illum! Repellendus nemo ullam tempore tempora omnis voluptate. Ex, quidem!
        Optio impedit accusantium perspiciatis, hic libero mollitia labore voluptatum, necessitatibus dignissimos, voluptate nemo numquam tempora ab corrupti alias. Impedit qui vitae maxime quo? Eos impedit ratione mollitia labore a at?
        Dolor eaque illum sunt dolores accusamus veritatis dolore, magnam similique ab mollitia aliquam maxime deleniti eos modi delectus hic odit molestias neque totam soluta, quisquam aperiam! Molestiae dolor ut enim.
        Molestiae tenetur dolores dolor quibusdam mollitia tempora ut amet ipsam repellat sit veritatis reiciendis, maxime vel ex quisquam unde repellendus voluptatum alias? Delectus sit facilis totam doloremque, corrupti id nobis?
        Natus suscipit repellat ut, nemo dolorem odit nam vel earum non illum inventore rem quis id enim sapiente sunt, ratione quasi numquam necessitatibus! Fuga voluptatibus iure doloribus corrupti tempore cumque.,`,
        state: TextState.toBeVerified,
    },
    {
        id: 'ID 5',
        text: 'this can be a new text written directly or a translation that was verified',
        state: TextState.verified,
        comment: 'this is a comment for this text',
    },
    {
        id: 'ID 6',
        text: 'this is a translation that has yet to be translated',
        state: TextState.toBeTranslated,
        feedback: 'this is a feedback',
        comment: 'this is a comment',
        link: 'these are links',
    },
    {
        id: 'ID 7',
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque necessitatibus pariatur, unde voluptate voluptas fugit eius nemo odit rerum veritatis temporibus praesentium, error dolore explicabo quo doloremque exercitationem accusantium?
        Eum vitae perspiciatis explicabo debitis fuga blanditiis, natus illo recusandae quaerat, cum placeat optio dolorem provident suscipit minus corporis labore illum! Repellendus nemo ullam tempore tempora omnis voluptate. Ex, quidem!
        Optio impedit accusantium perspiciatis, hic libero mollitia labore voluptatum, necessitatibus dignissimos, voluptate nemo numquam tempora ab corrupti alias. Impedit qui vitae maxime quo? Eos impedit ratione mollitia labore a at?
        Dolor eaque illum sunt dolores accusamus veritatis dolore, magnam similique ab mollitia aliquam maxime deleniti eos modi delectus hic odit molestias neque totam soluta, quisquam aperiam! Molestiae dolor ut enim.
        Molestiae tenetur dolores dolor quibusdam mollitia tempora ut amet ipsam repellat sit veritatis reiciendis, maxime vel ex quisquam unde repellendus voluptatum alias? Delectus sit facilis totam doloremque, corrupti id nobis?
        Natus suscipit repellat ut, nemo dolorem odit nam vel earum non illum inventore rem quis id enim sapiente sunt, ratione quasi numquam necessitatibus! Fuga voluptatibus iure doloribus corrupti tempore cumque.,`,
        state: TextState.toBeVerified,
    },
    {
        id: 'ID 8',
        text: 'this can be a new text written directly or a translation that was verified',
        state: TextState.verified,
        comment: 'this is a comment for this text',
    },
    {
        id: 'ID 9',
        text: 'this is a translation that has yet to be translated',
        state: TextState.toBeTranslated,
        feedback: 'this is a feedback',
        comment: 'this is a comment',
        link: 'these are links',
    },
    {
        id: 'ID STRING AHAH',
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque necessitatibus pariatur, unde voluptate voluptas fugit eius nemo odit rerum veritatis temporibus praesentium, error dolore explicabo quo doloremque exercitationem accusantium?
        Eum vitae perspiciatis explicabo debitis fuga blanditiis, natus illo recusandae quaerat, cum placeat optio dolorem provident suscipit minus corporis labore illum! Repellendus nemo ullam tempore tempora omnis voluptate. Ex, quidem!
        Optio impedit accusantium perspiciatis, hic libero mollitia labore voluptatum, necessitatibus dignissimos, voluptate nemo numquam tempora ab corrupti alias. Impedit qui vitae maxime quo? Eos impedit ratione mollitia labore a at?
        Dolor eaque illum sunt dolores accusamus veritatis dolore, magnam similique ab mollitia aliquam maxime deleniti eos modi delectus hic odit molestias neque totam soluta, quisquam aperiam! Molestiae dolor ut enim.
        Molestiae tenetur dolores dolor quibusdam mollitia tempora ut amet ipsam repellat sit veritatis reiciendis, maxime vel ex quisquam unde repellendus voluptatum alias? Delectus sit facilis totam doloremque, corrupti id nobis?
        Natus suscipit repellat ut, nemo dolorem odit nam vel earum non illum inventore rem quis id enim sapiente sunt, ratione quasi numquam necessitatibus! Fuga voluptatibus iure doloribus corrupti tempore cumque.,`,
        state: TextState.toBeVerified,
    },
    {
        id: 'ID 2',
        text: 'this can be a new text written directly or a translation that was verified',
        state: TextState.verified,
        comment: 'this is a comment for this text',
    },
    {
        id: 'ID 3',
        text: 'this is a translation that has yet to be translated',
        state: TextState.toBeTranslated,
        feedback: 'this is a feedback',
        comment: 'this is a comment',
        link: 'these are links',
    },
    {
        id: 'ID 4',
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque necessitatibus pariatur, unde voluptate voluptas fugit eius nemo odit rerum veritatis temporibus praesentium, error dolore explicabo quo doloremque exercitationem accusantium?
        Eum vitae perspiciatis explicabo debitis fuga blanditiis, natus illo recusandae quaerat, cum placeat optio dolorem provident suscipit minus corporis labore illum! Repellendus nemo ullam tempore tempora omnis voluptate. Ex, quidem!
        Optio impedit accusantium perspiciatis, hic libero mollitia labore voluptatum, necessitatibus dignissimos, voluptate nemo numquam tempora ab corrupti alias. Impedit qui vitae maxime quo? Eos impedit ratione mollitia labore a at?
        Dolor eaque illum sunt dolores accusamus veritatis dolore, magnam similique ab mollitia aliquam maxime deleniti eos modi delectus hic odit molestias neque totam soluta, quisquam aperiam! Molestiae dolor ut enim.
        Molestiae tenetur dolores dolor quibusdam mollitia tempora ut amet ipsam repellat sit veritatis reiciendis, maxime vel ex quisquam unde repellendus voluptatum alias? Delectus sit facilis totam doloremque, corrupti id nobis?
        Natus suscipit repellat ut, nemo dolorem odit nam vel earum non illum inventore rem quis id enim sapiente sunt, ratione quasi numquam necessitatibus! Fuga voluptatibus iure doloribus corrupti tempore cumque.,`,
        state: TextState.toBeVerified,
    },
    {
        id: 'ID 5',
        text: 'this can be a new text written directly or a translation that was verified',
        state: TextState.verified,
        comment: 'this is a comment for this text',
    },
    {
        id: 'ID 6',
        text: 'this is a translation that has yet to be translated',
        state: TextState.toBeTranslated,
        feedback: 'this is a feedback',
        comment: 'this is a comment',
        link: 'these are links',
    },
    {
        id: 'ID 7',
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque necessitatibus pariatur, unde voluptate voluptas fugit eius nemo odit rerum veritatis temporibus praesentium, error dolore explicabo quo doloremque exercitationem accusantium?
        Eum vitae perspiciatis explicabo debitis fuga blanditiis, natus illo recusandae quaerat, cum placeat optio dolorem provident suscipit minus corporis labore illum! Repellendus nemo ullam tempore tempora omnis voluptate. Ex, quidem!
        Optio impedit accusantium perspiciatis, hic libero mollitia labore voluptatum, necessitatibus dignissimos, voluptate nemo numquam tempora ab corrupti alias. Impedit qui vitae maxime quo? Eos impedit ratione mollitia labore a at?
        Dolor eaque illum sunt dolores accusamus veritatis dolore, magnam similique ab mollitia aliquam maxime deleniti eos modi delectus hic odit molestias neque totam soluta, quisquam aperiam! Molestiae dolor ut enim.
        Molestiae tenetur dolores dolor quibusdam mollitia tempora ut amet ipsam repellat sit veritatis reiciendis, maxime vel ex quisquam unde repellendus voluptatum alias? Delectus sit facilis totam doloremque, corrupti id nobis?
        Natus suscipit repellat ut, nemo dolorem odit nam vel earum non illum inventore rem quis id enim sapiente sunt, ratione quasi numquam necessitatibus! Fuga voluptatibus iure doloribus corrupti tempore cumque.,`,
        state: TextState.toBeVerified,
    },
    {
        id: 'ID 8',
        text: 'this can be a new text written directly or a translation that was verified',
        state: TextState.verified,
        comment: 'this is a comment for this text',
    },
    {
        id: 'ID 9',
        text: 'this is a translation that has yet to be translated',
        state: TextState.toBeTranslated,
        feedback: 'this is a feedback',
        comment: 'this is a comment',
        link: 'these are links',
    },
];

export default texts;