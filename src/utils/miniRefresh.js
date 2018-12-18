import MiniRefreshTools from 'minirefresh';
import 'minirefresh/dist/debug/minirefresh.css'

class MiniRefresh {

  init(container, downCb, upCb) {
    var miniRefresh = new MiniRefresh({
      container: container,
      down: {
        callback: function () {
          // 下拉事件
          downCb()
          miniRefresh.endDownLoading();
        }
      },
      up: {

        callback: function () {
          // 上拉事件
          upCb()
          // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
          miniRefresh.endUpLoading(true);
        }
      }
    });
  }
}

export default new MiniRefresh()