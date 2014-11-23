These are my solutions on stream-adventure nodeschool https://github.com/substack/stream-adventure

# Summary

* Node stream implementation is not always the best one - a lot of differences between 1, 2, and 3 streams

* Consider the following libs:

> through - kind of transforming stream

> split - readable/writable stream that splits the streamed data based on RegExp and pass it further

> concat-stream (https://github.com/maxogden/concat-stream) - writable stream that aggregates/cache the input so we could apply some processing on the whole thing; kind of reverse operation of split; See http://reidburke.com/2013/07/03/stream-concat-anti-pattern/

> https://github.com/dominictarr/event-stream - contains all the modules

> https://github.com/Raynos/duplexer - Takes a writable stream and a readable stream and makes them appear as a readable writable stream.

* http request and response are streams

* mikael's request module returns readable/writable stream

* sockets are streams - this module could be handy https://github.com/maxogden/websocket-stream

* trumpet can be used to stream html content
