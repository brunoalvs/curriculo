<template>
  <main>
    <header>
      <h1>{{ data.user.name }}</h1>
      <h2>{{ data.user.role }}</h2>
      <p>{{ data.user.summary }}</p>
    </header>
    <section>
      <h2>Experience</h2>
      <ul>
        <li v-for="(exp, index) in getContent.experience" :key="index">
          <h3>{{ exp.title }}</h3>
          <h4>{{ exp.company }}, <i>{{ exp.location }}</i></h4>
          <p>{{ exp.startDate }} - {{ exp.endDate }}</p>
          <p>{{ exp.description }}</p>
        </li>
      </ul>
    </section>
    <section>
      <h2>Education</h2>
      <ul>
        <li v-for="(edu, index) in getContent.education" :key="index">
          <h3>{{ edu.fieldOfStudy }} - <i>{{ edu.degree }}</i></h3>
          <p>{{ edu.school }}, {{ edu.location }}</p>
          <p>{{ edu.startDate }} - {{ edu.endDate }}</p>
          <p>{{ edu.grade }}</p>
        </li>
      </ul>
    </section>
  </main>
  <aside>
    <section class="useravatar">
      <img :src="`${data.user.photo}`" alt="profile" />
    </section>
    <section>
      <ul>
        <li>{{ data.user.location }}</li>
        <li>
          <a :href="`tel:${data.user.phone}`">{{ data.user.phone }}</a>
        </li>
        <li>
          <a :href="`mailto:${data.user.email}`">{{ data.user.email }}</a>
        </li>
        <li>
          <a :href="data.user.website" target="_blank">{{ data.user.website }}</a>
        </li>
        <li>
          <a :href="data.user.github" target="_blank">{{ data.user.github }}</a>
        </li>
        <li>
          <a :href="data.user.linkedin" target="_blank">{{ data.user.linkedin }}</a>
        </li>
      </ul>
    </section>
    <section class="certifications">
      <h2>Certifications</h2>
      <ul>
        <li v-for="(cert, index) in getCertifications" :key="index">
          <p><strong>{{ cert.title }}</strong></p>
          <p><i>{{ cert.authority }}</i></p>
          <p>{{ cert.issuedDate }}</p>
        </li>
      </ul>
    </section>
    <section>
      <h2>Skills</h2>
      <ul>
        <li v-for="(skill, index) in data.skills" :key="index">
          <p>{{ skill }}</p>
        </li>
      </ul>
    </section>
    <section>
      <h3>Languages</h3>
      <ul>
        <li v-for="(lang, index) in data.languages" :key="index">
          <p>{{ lang.language }}, <i>{{ lang.level }}</i></p>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script lang="js">
import data from './assets/data.json'

const formatDate = (array) => {
  return array.map((item) => (
    {
      ...item,
      startDate: new Date(item.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      endDate: new Date(item.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }
  ))
}

export default {
  name: 'App',
  data() {
    return {
      data: data
    }
  },
  computed: {
    getContent() {
      let experience = formatDate(this.data.experience)
      let education = formatDate(this.data.education)
      return {
        ...this.data,
        experience,
        education,
      }
    },
    getCertifications() {
      return this.data.certifications.map((cert) => (
        {
          ...cert,
          issuedDate: new Date(cert.issuedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        }
      ))
    }
    
  }
}
</script>

<style scoped lang="scss">
  main {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 1.5em;

    > header {
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      p {
        font-size: medium;
      }
    }

    > section {
      display: flex;
      flex-direction: column;
      gap: 1em;

      > ul {
        display: flex;
        flex-direction: column;
        gap: 1em;
      }

      h2 {
        font-size: xx-large;
      }

      h3 {
        font-size: x-large;
      }
    }
  }

  .useravatar {
    width: 100%;
    max-width: 200px;
    margin: 0 auto 2rem;
    
    > img {
      width: 100%;
      border-radius: 50%;
    }
  }

  .certifications {
    > ul {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }
  }

  aside {
    width: 100%;
    max-width: 300px;
    background-color: #9149e3;
    color: white;
    padding: 1.5em;

    a {
      color: white;
    }

    > section {
      margin-bottom: 1.5em;
    }
  }
</style>
