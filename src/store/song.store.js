const songState = {
  GET_SEQUENCE_LIST: 'GET_SEQUENCE_LIST',
  GET_CURRENT_INDEX: 'GET_CURRENT_INDEX',
  GET_PREV_INDEX: 'GET_PREV_INDEX',
  GET_NEXT_INDEX: 'GET_NEXT_INDEX',
  TOGGLE_IS_PLAYING: 'TOGGLE_IS_PLAYING',
  CHANGE_INDEX: 'CHANGE_INDEX',
  CHANGE_PLAY_MODE: 'CHANGE_PLAY_MODE'
}

function shuffle(list) {
  for (var i = list.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1))
    var itemAtIndex = list[randomIndex]
    list[randomIndex] = list[i]
    list[i] = itemAtIndex
  }
  return list
}

const song = {
  // 应用状态的数据结构
  state: {
    sequenceList: [], // 顺序歌单
    currentIndex: 0,
    playlist: [],
    isPlaying: false,
    fullScreen: false,
    playMode: 0// 0是顺序，1是随机，2是单曲
  },
  // 定义提交触发更改信息的描述
  getters: {
    playlist: state => {
      if (state.playMode === 0) {
        return state.sequenceList
      }
      if (state.playMode === 1) {
        return shuffle(state.sequenceList)
      }
      if (state.playMode === 2) {
        return state.sequenceList
      }
    }
  },
  actions: {
    getSequenceList({
      commit,
      state
    }, data) {
      commit(songState.GET_SEQUENCE_LIST, data)
    },
    getCurrentIndex({
      commit,
      state
    }, data) {
      commit(songState.GET_CURRENT_INDEX, data)
    },
    getPrevSong({
      commit,
      getters,
      state
    }) {
      let length = getters.playlist.length - 1
      commit(songState.GET_PREV_INDEX, length)
    },
    getNextSong({
      commit,
      getters,
      state
    }) {
      let length = getters.playlist.length - 1
      commit(songState.GET_NEXT_INDEX, length)
    },
    toggleIsPlaying({
      commit,
      state
    }) {
      commit(songState.TOGGLE_IS_PLAYING)
    },
    changeIndex({
      commit,
      state
    }, data) {
      commit(songState.CHANGE_INDEX, data)
    },
    changeMode({
      commit,
      state
    }, data) {
      commit(songState.CHANGE_PLAY_MODE, data)
    }
  },
  // 唯一允许更新应用状态的地方
  mutations: {
    GET_SEQUENCE_LIST(state, data) {
      state.sequenceList = data
    },
    GET_CURRENT_INDEX(state, data) {
      state.currentIndex = data
    },
    GET_PREV_INDEX(state, length) {
      state.currentIndex--
      if (state.currentIndex < 0) {
        state.currentIndex = length
      }
    },
    GET_NEXT_INDEX(state, length) {
      state.currentIndex++
      if (state.currentIndex > length) {
        state.currentIndex = 0
      }
    },
    TOGGLE_IS_PLAYING(state) {
      state.isPlaying = !state.isPlaying
    },
    CHANGE_INDEX(state, data) {
      state.currentIndex = data
    },
    CHANGE_PLAY_MODE(state, data) {
      state.playMode = data
    }
  }
}

export default song
