<template lang="pug">
a-list(:loading="loading", :dataSource="postsArray", itemLayout="vertical", :grid="{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }")
  template(slot="renderItem" slot-scope="item, index")
    a-list-item
      a-card
        a-card-meta(:title="item.title")
          template(#avatar)
            a-avatar(:src="item.avatarSrc")
        pre.
          文章编号：{{ item.post_id }}
          发布者编号：{{ item.user_id }}
          发布者昵称：{{ item.nickname }}
          发布时间：{{ new Date(item.since).toLocaleString() }}
          最后活跃用户：{{ item.last_active_user }}
          最后活跃时间：{{ new Date(item.last_active_date).toLocaleString() }}
          支持数：{{ item.positive }}
          反对数：{{ item.negative }}
        template(#actions)
          a(@click="removePost(item.post_id)") 删除文章
          a(@click="recoverPost(item.post_id)") 恢复文章
          a(:href="item.postSrc", target="_blank") 显示全文
</template>
<script lang="ts">
import { apiDiscussListAll, apiPostRecover, apiPostRemove } from '@/typescript/api'
import { getAvatarImageSrc, getDiscussUrl } from '@/typescript/objFormatUrl'
import Component from 'vue-class-component'
import Vue from 'vue'
import { DiscussListPostEntity } from '@/types/interface'

interface PostCard extends DiscussListPostEntity {
  avatarSrc: string;
  postSrc: string;
}

@Component
export default class extends Vue {
  postsArray = [] as Array<PostCard>;

  loading = false;

  mounted () {
    this.$nextTick(async () => {
      await this.loadData()
    })
  }

  async loadData () {
    this.loading = true
    try {
      this.postsArray = (await apiDiscussListAll(20)).map((item) => {
        const nItem = item as PostCard
        nItem.avatarSrc = getAvatarImageSrc(item.user_id)
        nItem.postSrc = getDiscussUrl(item.post_id)
        return nItem
      })
    } catch (e) {
      // do nothing
    }
    this.loading = false
  }

  async removePost (postId: number) : Promise<void> {
    try {
      await apiPostRemove(postId)
    } catch (e) {
      // do nothing
    }
    await this.loadData()
  }

  async recoverPost (postId: number) : Promise<void> {
    try {
      await apiPostRecover(postId)
    } catch (e) {
      // do nothing
    }
    await this.loadData()
  }
}
</script>
